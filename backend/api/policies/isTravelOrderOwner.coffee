module.exports = (req, res, next) ->
  sails.log.verbose "Policy isTravelOrderOwner"
  sails.log.verbose req.param 'id'


  query = {}
  if req.param 'id'
    query.id = req.param 'id'
  else
    query.id = req.param 'travelorderid'


  TravelOrder.findOne(query).exec (err, travelorder) ->
    sails.log.verbose "err", err, "travelorder", travelorder
    if err
      return res.forbidden err
    else if not travelorder?
      return res.forbidden "TravelOrder with this ID does not exists!"
    else
      current.travelorder = travelorder

      if travelorder.owner is current.user.id
        next()
      else
        return res.forbidden "You are not this TravelOrder owner!"


