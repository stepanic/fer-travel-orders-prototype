module.exports = (req, res, next) ->
  sails.log.verbose "Policy disableEditOtherUsers"

  id = req.param 'id'

  if id isnt current.user.id
    res.forbidden "You can only edit your profile data!"
  else
    next()
