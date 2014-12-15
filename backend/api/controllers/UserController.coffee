 # UserController
 #
 # @description :: Server-side logic for managing users
 # @help        :: See http://links.sailsjs.org/docs/controllers

module.exports =
  auth: (req, res) ->
    res.json 200, {summary: 'Authenticated'}
