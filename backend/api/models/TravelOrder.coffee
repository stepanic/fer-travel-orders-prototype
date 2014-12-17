 # Travel-order.coffee
 #
 # @description :: TODO: You might write a short summary of how this model works and what it represents here.
 # @docs        :: http://sailsjs.org/#!documentation/models

moment = require 'moment-timezone'
validator = require 'validator'
validationValues = require "../services/validationValues"

module.exports =

  types:
    correctTravelItemFormat: (items) ->
      for item in items
        if not item.quantity
          item.quantity = 1
        if not validator.isInt item.quantity
          return false
        if not validator.isFloat item.price
          return false
        if item.currency not in validationValues.currencies
          return false

      return true

    datetimeStartShouldBeLessThandatetimeFinish: (start) ->
      return start < @datetimeFinish

  attributes:
    datetimeStart:
      type: 'datetime'
      required: true
      datetimeStartShouldBeLessThandatetimeFinish: true
    datetimeFinish:
      type: 'datetime'
      required: true
    items:
      type: 'array'
      defaultsTo: []
      correctTravelItemFormat: true

    travelOrderPDFs:
      type: 'array'
      defaultsTo: []

    travelOrderReportPDFs:
      type: 'array'
      defaultsTo: []


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

        if i is 0
          if currentDate.hour() > 16
            allowanceSize = 0
          else if currentDate.hour() > 12
            allowanceSize = 0.5

        else if i is diffDays
          if currentDate.hour() < 8
            allowanceSize = 0
          else if currentDate.hour() < 12
            allowanceSize = 0.5

        allowances[i] =
          datetime: currentDate.toISOString()
          size: allowanceSize

        currentDate = a.add 1, 'days'

      return allowances

    getIsAllowedByDean: () ->
      if typeof @allowedBy is 'undefined'
        return false
      for user in @allowedBy
        if 'DEAN' in user.roles
          return true
      return false

    getIsAllowedByDepartmentHead: () ->
      if typeof @allowedBy is 'undefined'
        return false
      for user in @allowedBy
        if 'HEAD' in user.roles
          return true
      return false

    country:
      model: 'country'
    owner:
      model: 'user'
    budget:
      model: 'budgetsource'

    allowedBy:
      collection: 'user'
      via: 'allowedTravelOrders'
      dominant: true

    toJSON: () ->
      obj = @toObject()
      obj.dailyAllowances = obj.calculateDailyAllowances()
      obj.isAllowedByDean = obj.getIsAllowedByDean()
      obj.isAllowedByDepartmentHead = obj.getIsAllowedByDepartmentHead()
      return obj

  beforeCreate: (values, cb) ->
    values.owner = current.user.id
    if values.budgetsourcecode
      values.budget = current.budgetsource.id
    if values.countrycode
      values.country = current.country.id
    cb()
