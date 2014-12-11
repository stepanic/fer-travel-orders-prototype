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
