module.exports = (req, res, next) ->
  sails.log.verbose "Policy isCorrectBlueprintRequest"

  # Protect Blueprints
  if req.body
    if req.body.hasOwnProperty "id"
      return res.forbidden "Error, changing/setting 'id' attribute is forbidden!"

    if req.body.hasOwnProperty "createdAt"
      return res.forbidden "Error, changing/setting 'createdAt' attribute is forbidden!"

    if req.body.hasOwnProperty "updatedAt"
      return res.forbidden "Error, changing/setting 'updatedAt' attribute is forbidden!"

  next()

