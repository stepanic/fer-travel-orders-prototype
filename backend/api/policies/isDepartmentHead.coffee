module.exports = (req, res, next) ->
  if current.user?
    if 'HEAD' in current.user.roles
      query = {}
      travelorderid = req.param 'travelorderid'
      if travelorderid
        query.id = travelorderid
      else if req.param 'id' # for TravelOrder.findOne
        query.id = req.param 'id'

      TravelOrder.findOne(query).exec (err, travelorder) ->
        sails.log.verbose "err", err, "travelorder", travelorder
        if err
          return res.forbidden err
        else if not travelorder?
          return res.forbidden "TravelOrder with this ID does not exists!"
        else
          current.travelorder = travelorder

          User.findOne({id:travelorder.owner}).exec (err, owner) ->
            if err
              return res.forbidden err

            if owner.department is current.user.department
              next()
            else
              res.forbidden "You are not an #{owner.department} Department HEAD!"
    else
      res.forbidden "You are not an Department HEAD!"
  else
    res.forbidden "You are not an Department HEAD!"
