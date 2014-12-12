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
    TravelOrder.find({ owner: current.user.id }).exec (err, travelorders) ->
      if err
        res.json 403,
          summary: "Error: You are not allowed to read all your Travel orders!"
      else
        res.json 200,
          travelorders

  generatePDF: (req, res) ->
    fs = require 'fs'
    PDFDocument = require 'pdfkit'
    moment = require 'moment-timezone'

    doc = new PDFDocument()
    # Path
    pdfPath = 'pdf/proba'
    # Create directory if not exists
    if not fs.existsSync pdfPath
      fs.mkdirSync pdfPath, 0o777

    # Pipe it's output somewhere, like to a file or HTTP response
    # See below for browser usage
    doc.pipe fs.createWriteStream(pdfPath + '/output.pdf')

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

          console.log currencies
          console.log travelorder.toJSON()

          fontNormal = 'fonts/arial.ttf'
          fontBold = 'fonts/arialbd.ttf'
          hashChar = '#'

          t = travelorder.toJSON()

          doc.image('media/fer.png', 15, 15, fit: [100, 100])

          doc.font(fontNormal).fontSize(14).text("Sveučilište u Zagrebu", 0, 15,
            width: 612
            align: 'center')

          doc.font(fontNormal).fontSize(14).text("Fakultet elektrotehnike i računarstva", 0, 30,
            width: 612
            align: 'center')

          doc.font(fontBold).fontSize(35).text("PUTNI NALOG", 0, 90,
            width: 612
            align: 'center')

          doc.font(fontNormal).fontSize(14).text("ID: #{travelorder.id}", 15, 130,
            width: 200
            align: 'left')

          doc.font(fontNormal).fontSize(14).text("Zavod: #{t.owner.department}", 15, 160,
            width: 200
            align: 'left')

          doc.font(fontNormal).fontSize(14).text("Autor:", 15, 180,
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

            current = t.country.dailyAllowanceSize * d.size
            total += current
            doc.font(fontNormal).fontSize(12).text("#{current} #{t.country.dailyAllowanceCurrency}", 100, y,
              width: 200
              align: 'left')

            y += 20

          doc.font(fontBold).fontSize(12).text("UKUPNO:", 15, y,
            width: 200
            align: 'left')
          doc.font(fontBold).fontSize(12).text("#{total} #{t.country.dailyAllowanceCurrency}", 100, y,
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

            current = item.price * item.quantity
            doc.font(fontNormal).fontSize(12).text("#{current} #{item.currency}", 400, y,
              width: 200
              align: 'left')

            # Convert to TravelOrder.country.dailyAllowanceCurrency
            if item.currency isnt t.country.dailyAllowanceCurrency
              current = current * currencies[item.currency].exchangeRateToHRK / currencies[t.country.dailyAllowanceCurrency].exchangeRateToHRK

            total += current

            doc.font(fontNormal).fontSize(12).text("#{current} #{t.country.dailyAllowanceCurrency}", 490, y,
              width: 200
              align: 'left')

            y += 20

          doc.font(fontBold).fontSize(12).text("UKUPNO:", 280, y,
            width: 200
            align: 'left')
          doc.font(fontBold).fontSize(12).text("#{total} #{t.country.dailyAllowanceCurrency}", 490, y,
            width: 200
            align: 'left')





          # end and display the document in the iframe to the right
          doc.end()

          return res.json 200,
            summary: "TravelOrder PDF is generated!"




