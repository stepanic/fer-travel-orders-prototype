 # Travel-order.coffee
 #
 # @description :: TODO: You might write a short summary of how this model works and what it represents here.
 # @docs        :: http://sailsjs.org/#!documentation/models

module.exports =

  attributes:
    owner:
      model: 'user'
    budget:
      model: 'budgetsource'

  beforeCreate: (values, cb) ->
    values.owner = current.user.id
    if values.budgetsourcecode
      values.budget = current.budgetsource.id
    cb()
