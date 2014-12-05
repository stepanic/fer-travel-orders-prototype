module.exports = (req, res, next) ->
  if req.headers.token is (process.env.MASTER_TOKEN || "mastersecret")
    next()
  else
    res.forbidden "Master token is wrong!"
