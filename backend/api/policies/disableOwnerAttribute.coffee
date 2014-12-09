module.exports = (req, res, next) ->
  sails.log.verbose "Policy disableOwnerAttribute"

  owner = req.param 'owner'
  if owner
    res.forbidden "Owner attribute is forbidden, will be populated from Authorization headers!"
  else
    next()
