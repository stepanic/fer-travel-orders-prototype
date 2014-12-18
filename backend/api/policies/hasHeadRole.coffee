module.exports = (req, res, next) ->
  if current.user?
    if 'HEAD' in current.user.roles
      next()
    else
      res.forbidden "You are not an Department HEAD!"
  else
    res.forbidden "You are not an Department HEAD!"

