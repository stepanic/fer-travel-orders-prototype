 # Country.coffee
 #
 # @description :: TODO: You might write a short summary of how this model works and what it represents here.
 # @docs        :: http://sailsjs.org/#!documentation/models

validationValues = require "../services/validationValues"

module.exports =

  types:
    uppercase: (string) ->
      return string is string.toUpperCase()

  attributes:
    code: # ISO code of country
      type: "string"
      required: true
      unique: true
      uppercase: true
      alpha: true
      minLength: 2
      maxLength: 2
    name:
      type: "string"
      required: true
    dailyAllowanceCurrency:
      type: "string"
      required: true
      enum: validationValues.currencies


