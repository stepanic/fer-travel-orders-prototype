policiesPath = '../api/policies/'
async = require 'async'

class MockResponse
  constructor: (@cb) ->
  json: () -> this.cb()
  forbidden: () -> this.cb()

# This is a function for making logical OR operation between policies.
# Policies are called asynchronously, and if any policy is successful variable passed is set to true.
# After all policies are complete, policyOR returns a generic json status=400 if OR is false, else calls next() if OR is true.
# @param argument ([string]) Array of policy names.
module.exports =
  disableAttributes: (argument) ->
    (req, res, next) ->
      for param in argument
        if req.param param
          return res.forbidden "#{param} attribute is forbidden!"
      next()


  policyOR: (argument) ->
    #If policy is successful variable passed is set to true
    passed = false
    policies = (require(policiesPath + policyName) for policyName in argument)
    # This is a function which represents a single policy which encapsulates several policies from the argument in a logical OR demeanor
    (req, res, next) ->
      # async.each asynchronously handles items in the policies array
      passed = false
      async.each policies,
        (policy, cb) ->
          policy req, new MockResponse(cb), () ->
            sails.log.verbose "Policy", policy
            passed = true
            cb()
        (err) ->
          sails.log.verbose "Passed", passed
          if passed
            sails.log.verbose 'OR PASSED'
            next()
          else
            sails.log.verbose "OR DIDN'T PASS"
            res.json 400, summary: "policyOR didn't pass"


