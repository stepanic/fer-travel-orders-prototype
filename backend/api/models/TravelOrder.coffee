 # Travel-order.coffee
 #
 # @description :: TODO: You might write a short summary of how this model works and what it represents here.
 # @docs        :: http://sailsjs.org/#!documentation/models

moment = require 'moment-timezone'

module.exports =

  attributes:
    datetimeStart:
      type: 'datetime'
      required: true
    datetimeFinish:
      type: 'datetime'
      required: true

    calculateDailyAllowances: () ->
      a = moment.utc @datetimeStart
      b = moment.utc @datetimeFinish

      allowances = []

      diffDays = b.diff a, 'days'
      sails.log.verbose "diffDays", diffDays

      for i in [0..diffDays]
        currentDate = a
        if i is diffDays
          currentDate = b

        allowanceSize = 1

        if i is 0 or i is diffDays
          if currentDate.hour() < 8
            allowanceSize = 0
          else if currentDate.hour() < 12
            allowanceSize = 0.5

        allowances[i] =
          datetime: currentDate.toISOString()
          size: allowanceSize

        currentDate = a.add 1, 'days'

      return allowances

    # country:

    owner:
      model: 'user'
    budget:
      model: 'budgetsource'

    toJSON: () ->
      obj = @toObject()
      obj.dailyAllowances = obj.calculateDailyAllowances()
      return obj

  beforeCreate: (values, cb) ->
    values.owner = current.user.id
    if values.budgetsourcecode
      values.budget = current.budgetsource.id
    cb()
