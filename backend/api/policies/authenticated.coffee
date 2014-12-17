module.exports = (req, res, next) ->
  sails.log.verbose req.headers
  sails.log.verbose req.param 'headers'

  headers = req.param 'headers'

  username = null
  password = ' '
  if headers and headers.username and headers.password
    username = headers.username
    password = headers.password
  else
    username = req.headers.username
    password = req.headers.password

  sails.log.verbose username, password


  User.findOne(username: username).exec (err, user) ->
    sails.log.verbose "err", err, "user", user
    if err
      return res.forbidden err
    else if not user?
      return res.forbidden "User with this username not exists"
    else if not user.verifyPassword password
      return res.forbidden "Wrong password!"
    else
      current.user = user
      next()
