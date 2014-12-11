 # TravelOrderItem.coffee
 #
 # @description :: It's used only for auto suggesting, doesn't have any realtion with TravelOrder!
 # @docs        :: http://sailsjs.org/#!documentation/models

module.exports =

  attributes:
    name:
      type: 'string'
      required: true
      unique: true
