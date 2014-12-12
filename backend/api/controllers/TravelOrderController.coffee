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
          console.log currencies
          console.log travelorder

          fontNormal = 'fonts/arial.ttf'
          fontBold = 'fonts/arialbd.ttf'

          t = travelorder

          console.log doc.x, doc.y

          doc.font(fontNormal).fontSize(14).text("Sveučilište u Zagrebu", 150, 15,
            width: 400
            align: 'center')

          doc.font(fontNormal).fontSize(14).text("Fakultet elektrotehnike i računarstva", 140, 30,
            width: 400
            align: 'center')

          doc.font(fontBold).fontSize(35).text("PUTNI NALOG", 0, 90,
            width: 612
            align: 'center')

          doc.font(fontNormal).fontSize(14).text("ID: #{travelorder.id}", 15, 100,
            width: 200
            align: 'left')

          doc.font(fontNormal).fontSize(14).text("Zavod: #{t.owner.department}", 15, 130,
            width: 200
            align: 'left')

          doc.font(fontNormal).fontSize(14).text("Autor:", 15, 150,
            width: 200
            align: 'left')
          doc.font(fontNormal).fontSize(12).text("#{t.owner.title} #{t.owner.firstName} #{t.owner.lastName}", 15, 166,
            width: 250
            align: 'left')
          doc.font(fontNormal).fontSize(12).text("#{t.owner.email}", 15, 178,
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
          doc.font(fontNormal).fontSize(12).text("#{t.budget.name} (#{t.budget.code})", 470, 182,
            width: 250
            align: 'left')

          doc.image('media/fer.png', 15, 15, fit: [100, 100])


          doc.fontSize(45).text "bla ovo radi", 100, 380


          # end and display the document in the iframe to the right
          doc.end()

          return res.json 200,
            summary: "TravelOrder PDF is generated!"




