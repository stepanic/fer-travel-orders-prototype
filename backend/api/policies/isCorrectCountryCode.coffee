module.exports = (req, res, next) ->
  sails.log.verbose "Policy isCorrectCountryCode"
  sails.log.verbose req.param 'countrycode'

  query = {}
  if req.param 'country'
    query.id = req.param 'country'
  else
    query.code = req.param 'countrycode'

  Country.findOne(query).exec (err, country) ->
    sails.log.verbose "err", err, "country", country
    if err
      return res.forbidden err
    else if not country?
      return res.forbidden "Country with this code/id not exists!"
    else
      current.country = country
      next()


