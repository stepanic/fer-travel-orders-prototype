module.exports = (req, res, next) ->
  sails.log.verbose req.headers

  User.findOne(username: req.headers.username).exec (err, user) ->
    sails.log.verbose "err", err, "user", user
    if err
      return res.forbidden err
    else if not user?
      return res.forbidden "User with this username not exists"
    else if not user.verifyPassword req.headers.password
      return res.forbidden "Wrong password!"
    else
      current.user = user
      next()
