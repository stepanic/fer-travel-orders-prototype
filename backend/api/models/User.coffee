 # User.coffee
 #
 # @description :: TODO: You might write a short summary of how this model works and what it represents here.
 # @docs        :: http://sailsjs.org/#!documentation/models
validationValues = require "../services/validationValues"

unless typeof String::endsWith is "function"
  String::endsWith = (str) ->
    @substring(@length - str.length, @length) is str

module.exports =

  types:
    isRolesSubset: (roles) ->
      allRoles = validationValues.userRoles
      sails.log.verbose roles
      sails.log.verbose allRoles
      for r1 in roles
        return false if r1 not in allRoles
      return true
    isPasswordConfirmed: (password) ->
      return password is @confirmPassword
    isFerDomainMail: (email) ->
      return email.endsWith "@fer.hr"


  attributes:
    firstName:
      type: 'string'
      required: true
    lastName:
      type: 'string'
      required: true
    title:
      type: 'string'
      defaultsTo: ""
    username:
      type: 'string'
      required: true
      unique: true
    password:
      type: 'string'
      required: true
      isPasswordConfirmed: true
      protected: true
    email:
      type: 'string'
      required: true
      unique: true
      email: true
      isFerDomainMail: true

    roles:
      type: 'array'
      isRolesSubset: true
      required: true
      defaultsTo: ['USER']
    department:
      type: 'string'
      required: true
      enum: validationValues.departments


    ownedTravelOrders:
      collection: 'travelorder'
      via: 'owner'

    allowedTravelOrders:
      collection: 'travelorder'
      via: 'allowedBy'

    verifyPassword: (password) ->
      bcrypt = require 'bcrypt'
      return bcrypt.compareSync password, @password


  beforeCreate: (values, cb) ->
    bcrypt = require 'bcrypt'
    bcrypt.genSalt 10, (err, salt) ->
      if err
        cb err
      bcrypt.hash values.password, salt, (err, hash) ->
        if err
          cb err
        values.password = hash
        cb()

  beforeUpdate: (values, cb) ->
    sails.log.verbose "User update", values
    if values.password
      bcrypt = require 'bcrypt'
      bcrypt.genSalt 10, (err, salt) ->
        if err
          cb err
        bcrypt.hash values.password, salt, (err, hash) ->
          if err
            cb err
          values.password = hash
          cb()
    else
      cb()

