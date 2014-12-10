module.exports = (req, res, next) ->
  sails.log.verbose "Policy requireTravelOrderIdAttribute"

  attribute = req.param 'travelorderid'
  if not attribute?
    res.forbidden "TravelOrderId attribute is required!"
  else
    next()
