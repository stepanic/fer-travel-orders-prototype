module.exports = (req, res, next) ->
  if current.user?
    if 'admin' in current.user.roles
      next()
    else
      res.forbidden "You are not an Administrator!"
  else
    res.forbidden "You are not an Authenticated!"
