 # Travel-orderController
 #
 # @description :: Server-side logic for managing travel-orders
 # @help        :: See http://links.sailsjs.org/docs/controllers


module.exports =
  allow: (req, res) ->
    travelorderid =  req.param 'travelorderid'

    TravelOrder.findOne({ id: travelorderid }).exec (err, travelorder) ->
      travelorder.allowedBy.add current.user.id
      travelorder.save (err, travelorder) ->
        if err
          res.json 403,
            summary: "Error: Travel order is NOT allowed, because it's already allowed by same user!"
        else
          res.json 200,
            summary: "Travel order is allowed!"

  myall: (req, res) ->
    TravelOrder.find({ owner: current.user.id }).populateAll().exec (err, travelorders) ->
      if err
        res.json 403,
          summary: "Error: You are not allowed to read all your Travel orders!"
      else
        res.json 200,
          travelorders

  waitingApprove: (req, res) ->
    TravelOrder.find().populateAll().exec (err, travelorders) ->
      if err
        res.json 403,
          summary: "Error: You are not allowed to read all waitingApprove Travel orders!"
      else
        i = 0
        isDean = 'DEAN' in current.user.roles
        isDepartmentHead = 'HEAD' in current.user.roles
        while i < travelorders.length
          t = travelorders[i]

          toSplice = false

          if not isDean and isDepartmentHead and t.owner.department isnt current.user.department
            toSplice = true

          if not toSplice
            for a in t.allowedBy
              if a.id is current.user.id
                toSplice = true
                break

          isAllowedByDepartmentHead = false
          if not toSplice and isDean
            for a in t.allowedBy
              if 'HEAD' in a.roles
                isAllowedByDepartmentHead = true
                break
            if not isAllowedByDepartmentHead
              toSplice = true



          if toSplice
            travelorders.splice(i, 1)
          else
            i++

        res.json 200,
          travelorders

  generatePDF: (req, res) ->
    fs = require 'fs'
    PDFDocument = require 'pdfkit'
    moment = require 'moment-timezone'

    pdfType = "PUTNI NALOG"
    type = req.param 'type'
    if type is 'report'
      pdfType = "IZVJEŠTAJ O ZAVRŠENOM SLUŽBENOM PUTOVANJU"

    doc = new PDFDocument()

    TravelOrder.findOne({id: req.param 'travelorderid'}).populateAll().exec (err, travelorder) ->
      if err
        return res.json 404,
          summary: "Error: TravelOrder with selected travelorderid not exists!"
      else

        Currency.find().exec (err, currencies) ->
          # Prepare currencies for better getting
          newCurrencies = []
          for c in currencies
            newCurrencies[c.name] = c
          currencies = newCurrencies

          sails.log.verbose currencies
          sails.log.verbose travelorder.toJSON()

          fontNormal = 'fonts/arial.ttf'
          fontBold = 'fonts/arialbd.ttf'
          hashChar = '#'

          t = travelorder.toJSON()


          # Path
          pdfPath = "assets/pdf/to#{t.id}"
          # Create directory if not exists
          if not fs.existsSync pdfPath
            fs.mkdirSync pdfPath, 0o777

          # Save to PDF file
          now = moment().format "YYYY-MM-DD_HH-mm-ss"
          fileName = "/PutniNalog_#{t.id}_#{now}.pdf"
          if type is 'report'
            fileName = "/Izvjestaj_#{t.id}_#{now}.pdf"
          filePath = pdfPath + fileName
          doc.pipe fs.createWriteStream filePath

          # Without assets
          pdfPath = "pdf/to#{t.id}"
          filePath = pdfPath + fileName

          # FER Logo
          doc.image('media/fer.png', 15, 15, fit: [100, 100])

          doc.font(fontNormal).fontSize(14).text("Sveučilište u Zagrebu", 0, 15,
            width: 612
            align: 'center')

          doc.font(fontNormal).fontSize(14).text("Fakultet elektrotehnike i računarstva", 0, 30,
            width: 612
            align: 'center')

          fontSize = 35
          if type is 'report'
            fontSize = 24
          doc.font(fontBold).fontSize(fontSize).text("#{pdfType}", 0, 90,
            width: 612
            align: 'center')

          doc.font(fontNormal).fontSize(14).text("ID: #{travelorder.id}", 15, 130,
            width: 200
            align: 'left')

          doc.font(fontNormal).fontSize(14).text("Zavod: #{t.owner.department}", 15, 160,
            width: 200
            align: 'left')

          doc.font(fontNormal).fontSize(14).text("Podnositelj:", 15, 180,
            width: 200
            align: 'left')
          doc.font(fontNormal).fontSize(12).text("#{t.owner.title} #{t.owner.firstName} #{t.owner.lastName}", 15, 196,
            width: 250
            align: 'left')
          doc.font(fontNormal).fontSize(12).text("#{t.owner.email}", 15, 208,
            width: 250
            align: 'left')

          doc.font(fontNormal).fontSize(14).text("Početak putovanja:", 15, 230,
            width: 200
            align: 'left')
          travelStart = moment.utc(t.datetimeStart).format "DD.MM.YYYY. HH:mm"
          doc.font(fontNormal).fontSize(12).text("#{travelStart}", 15, 246,
            width: 250
            align: 'left')

          doc.font(fontNormal).fontSize(14).text("Kraj putovanja:", 150, 230,
            width: 200
            align: 'left')
          travelFinish = moment.utc(t.datetimeFinish).format "DD.MM.YYYY. HH:mm"
          doc.font(fontNormal).fontSize(12).text("#{travelFinish}", 150, 246,
            width: 250
            align: 'left')



          doc.font(fontNormal).fontSize(14).text("Država putovanja:", 470, 130,
            width: 200
            align: 'left')
          doc.font(fontNormal).fontSize(12).text("#{t.country.name}", 470, 146,
            width: 250
            align: 'left')

          doc.font(fontNormal).fontSize(14).text("Troškove podmiruje:", 470, 166,
            width: 200
            align: 'left')
          doc.font(fontNormal).fontSize(12).text("#{hashChar}#{t.budget.code} #{t.budget.name}", 470, 182,
            width: 250
            align: 'left')

          allowedByDean = 'NE'
          if t.isAllowedByDean is true
            allowedByDean = 'DA'
          doc.font(fontNormal).fontSize(12).text("Odobrio dekan: #{allowedByDean}", 470, 202,
            width: 200
            align: 'left')
          allowedByDepartmentHead = 'NE'
          if t.isAllowedByDepartmentHead is true
            allowedByDepartmentHead = 'DA'
          doc.font(fontNormal).fontSize(12).text("Odobrio predstojnik: #{allowedByDepartmentHead}", 470, 216,
            width: 200
            align: 'left')

          if type is 'report'
            doc.font(fontBold).fontSize(14).text("Dnevnice:", 15, 270,
              width: 200
              align: 'left')
            doc.font(fontNormal).fontSize(12).text("Puna dnevnica: #{t.country.dailyAllowanceSize} #{t.country.dailyAllowanceCurrency}", 100, 272,
              width: 200
              align: 'left')

            total = 0
            y = 290
            for d in t.dailyAllowances
              date = moment.utc d.datetime
              dateInFormat = date.format "DD.MM.YYYY."

              doc.font(fontNormal).fontSize(12).text("#{dateInFormat}", 15, y,
                width: 200
                align: 'left')

              cur = t.country.dailyAllowanceSize * d.size
              total += cur
              doc.font(fontNormal).fontSize(12).text("#{cur.toFixed(2)} #{t.country.dailyAllowanceCurrency}", 100, y,
                width: 200
                align: 'left')

              y += 20
            y1 = y
            totalDailyAllowances = total

            doc.font(fontBold).fontSize(12).text("UKUPNO:", 15, y,
              width: 200
              align: 'left')
            doc.font(fontBold).fontSize(12).text("#{total.toFixed(2)} #{t.country.dailyAllowanceCurrency}", 100, y,
              width: 200
              align: 'left')


            doc.font(fontBold).fontSize(14).text("Troškovi:", 280, 270,
              width: 200
              align: 'left')

            total = 0
            y = 290
            for item in t.items
              doc.font(fontNormal).fontSize(12).text("#{item.name}", 280, y,
                width: 200
                align: 'left')

              doc.font(fontNormal).fontSize(12).text("#{item.quantity}kom", 390, y,
                width: 200
                align: 'left')

              cur = item.price * item.quantity
              doc.font(fontNormal).fontSize(12).text("#{cur.toFixed(2)} #{item.currency}", 440, y,
                width: 200
                align: 'left')

              # Convert to TravelOrder.country.dailyAllowanceCurrency
              if item.currency isnt t.country.dailyAllowanceCurrency
                cur = cur * currencies[item.currency].exchangeRateToHRK / currencies[t.country.dailyAllowanceCurrency].exchangeRateToHRK

              total += cur

              doc.font(fontNormal).fontSize(12).text("#{cur.toFixed(2)} #{t.country.dailyAllowanceCurrency}", 525, y,
                width: 200
                align: 'left')

              y += 20
            y2 = y
            totalExpenses = total

            doc.font(fontBold).fontSize(12).text("UKUPNO:", 280, y,
              width: 200
              align: 'left')
            doc.font(fontBold).fontSize(12).text("#{total.toFixed(2)} #{t.country.dailyAllowanceCurrency}", 525, y,
              width: 200
              align: 'left')

            # Continue text after longest column
            y = Math.max y1, y2
            y += 30

            doc.font(fontBold).fontSize(12).text("RAZLIKA: Dnevnice - Troškovi = ", 15, y,
              width: 200
              align: 'left')

            doc.font(fontBold).fontSize(12).text("#{(totalDailyAllowances - totalExpenses).toFixed(2)} #{t.country.dailyAllowanceCurrency}", 200, y,
              width: 200
              align: 'left')

          # Footer
          ownerSign = "#{t.owner.title} #{t.owner.firstName} #{t.owner.lastName}"
          underlineOwnerSign = "___________________________"
          doc.font(fontBold).fontSize(12).text("Podnositelj", 15, 640,
            width: 220
            align: 'center')
          doc.font(fontBold).fontSize(12).text("#{underlineOwnerSign}", 15, 680,
            width: 220
            align: 'center')
          doc.font(fontNormal).fontSize(12).text("#{ownerSign}", 15, 700,
            width: 220
            align: 'center')

          doc.font(fontNormal).fontSize(12).text("Zagreb", 0, 640,
            width: 612
            align: 'center')
          now = moment().format("DD.MM.YYYY.")
          doc.font(fontNormal).fontSize(12).text("#{now}", 0, 660,
            width: 612
            align: 'center')

          deanSign = "#{current.deanSignature}"
          underlineDeanSign = "___________________________"
          doc.font(fontBold).fontSize(12).text("Dekan", 377, 640,
            width: 220
            align: 'center')
          doc.font(fontBold).fontSize(12).text("#{underlineDeanSign}", 377, 680,
            width: 220
            align: 'center')
          doc.font(fontNormal).fontSize(12).text("#{deanSign}", 377, 700,
            width: 220
            align: 'center')

          # End of PDF document
          doc.end()

          if type is 'report'
            travelorder.travelOrderReportPDFs.push filePath
          else
            travelorder.travelOrderPDFs.push filePath

          travelorder.save (err, s) ->
            if err
              return res.json 400, err

            return res.json 200,
              summary: "TravelOrder PDF is generated!"









