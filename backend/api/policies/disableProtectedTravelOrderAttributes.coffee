module.exports = (req, res, next) ->
  sails.log.verbose "Policy disableProtectedTravelOrderAttributes"

  travelOrderPDFs = req.param 'travelorderpdfs'
  travelOrderReportPDFs = req.param 'travelorderreportpdfs'
  allowedBy = req.param 'allowedby'

  if travelOrderPDFs
    res.forbidden "travelOrderPDFs attribute is forbidden!"
  else if travelOrderReportPDFs
    res.forbidden "travelOrderReportPDFs attribute is forbidden!"
  else if allowedBy
    res.forbidden "allowedBy attribute is forbidden!"
  else
    next()
