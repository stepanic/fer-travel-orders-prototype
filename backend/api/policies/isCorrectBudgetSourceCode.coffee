module.exports = (req, res, next) ->
  sails.log.verbose "Policy isCorrectBudgetSourceCode"
  sails.log.verbose req.param 'budgetsourcecode'

  query = {}
  if req.param 'budget'
    query.id = req.param 'budget'
  else
    query.code = req.param 'budgetsourcecode'

  BudgetSource.findOne(query).exec (err, budgetsource) ->
    sails.log.verbose "err", err, "budgetsource", budgetsource
    if err
      return res.forbidden err
    else if not budgetsource?
      return res.forbidden "BudgetSource with this code/id not exists!"
    else
      current.budgetsource = budgetsource
      next()


