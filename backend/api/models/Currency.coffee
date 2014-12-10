 # Currency.coffee
 #
 # @description :: TODO: You might write a short summary of how this model works and what it represents here.
 # @docs        :: http://sailsjs.org/#!documentation/models
validationValues = require "../services/validationValues"

module.exports =

  attributes:
    name:
      type: 'string'
      required: true
      unique: true # TODO: put unique:false and enable to calculate exchangeRateToHRK by date
      enum: validationValues.currencies
    exchangeRateToHRK:
      type: 'float'
      required: true




