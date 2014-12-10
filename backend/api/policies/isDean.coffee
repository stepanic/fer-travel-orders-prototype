module.exports = (req, res, next) ->
  if current.user?
    if 'DEAN' in current.user.roles
      next()
    else
      res.forbidden "You are not an Dean!"
  else
    res.forbidden "You are not an Dean!"
