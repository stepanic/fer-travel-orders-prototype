module.exports = (req, res, next) ->
  if current.user?
    if 'ADMIN' in current.user.roles
      next()
    else
      res.forbidden "You are not an Administrator!"
  else
    res.forbidden "You are not an Authenticated!"

