/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */
var policyBuilder = require('../lib/policyBuilder');

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': ['authenticated'],

  UserController: {
    'find': ['authenticated'],
    'update': ['authenticated', 'disableEditOtherUsers', 'isCorrectBlueprintRequest'],
    'create': ['isCorrectBlueprintRequest', policyBuilder.policyOR(['hasMasterToken', 'isAdmin'])],
    'destroy': ['authenticated', 'isAdmin']
  },

  TravelOrderController: {
    'create': [
      'authenticated',
      'disableOwnerAttribute',
      'disableProtectedTravelOrderAttributes',
      'isCorrectBlueprintRequest',
      'isCorrectBudgetSourceCode',
      'isCorrectCountryCode'
    ],
    'update': [
      'authenticated',
      'disableProtectedTravelOrderAttributes',
      'isCorrectBlueprintRequest',
      policyBuilder.policyOR(['isAdmin', 'isTravelOrderOwner'])
    ],
    'allow': [
      'authenticated',
      'requireTravelOrderIdAttribute',
      policyBuilder.policyOR(['isDean', 'isDepartmentHead'])
    ],
    'findOne': [
      'authenticated',
      policyBuilder.policyOR(['hasMasterToken', 'isAdmin', 'isTravelOrderOwner', 'isDepartmentHead'])
    ],
    'find': [
      'authenticated',
      policyBuilder.policyOR(['hasMasterToken', 'isAdmin'])
    ],
    'myall': [
      'authenticated'
    ],
    'destroy': ['authenticated', 'isAdmin'],
    'generatePDF': [
      policyBuilder.policyOR(['hasMasterToken', 'authenticated']),
      policyBuilder.policyOR(['hasMasterToken', 'isAdmin', 'isTravelOrderOwner', 'isDepartmentHead'])
    ]
  },

  BudgetSourceController: {
    'find': ['authenticated'],
    'update': [policyBuilder.policyOR(['hasMasterToken', 'isAdmin']), 'isCorrectBlueprintRequest'],
    'create': [policyBuilder.policyOR(['hasMasterToken', 'isAdmin']), 'isCorrectBlueprintRequest'],
    'destroy': [policyBuilder.policyOR(['hasMasterToken', 'isAdmin'])]
  },

  TravelOrderItemController: {
    'find': ['authenticated'],
    'update': [policyBuilder.policyOR(['hasMasterToken', 'isAdmin']), 'isCorrectBlueprintRequest'],
    'create': [policyBuilder.policyOR(['hasMasterToken', 'isAdmin']), 'isCorrectBlueprintRequest'],
    'destroy': [policyBuilder.policyOR(['hasMasterToken', 'isAdmin'])]
  },

  CurrencyController: {
    'find': ['authenticated'],
    'findOne': ['authenticated'],
    'update': [
      policyBuilder.policyOR(['hasMasterToken', 'isAdmin']),
      'isCorrectBlueprintRequest'
    ],
    'create': [
      policyBuilder.policyOR(['hasMasterToken', 'isAdmin']),
      'isCorrectBlueprintRequest'
    ],
    'destroy': [policyBuilder.policyOR(['hasMasterToken', 'isAdmin'])]
  },

  CountryController: {
    'find': ['authenticated'],
    'update': [
      policyBuilder.policyOR(['hasMasterToken', 'isAdmin']),
      'isCorrectBlueprintRequest'
    ],
    'create': [
      policyBuilder.policyOR(['hasMasterToken', 'isAdmin']),
      'isCorrectBlueprintRequest'
    ],
    'destroy': [policyBuilder.policyOR(['hasMasterToken', 'isAdmin'])]
  }

};
