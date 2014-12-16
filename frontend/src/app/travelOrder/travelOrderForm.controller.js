'use strict';

angular.module('frontend')
  .controller('TravelOrderFormCtrl', [
    '$scope',
    'Api',
    function ($scope, Api) {

      $scope.model = {
        budgetsource: null,
        country: null,
        datetimeStart: null,
        datetimeFinish: null
      }


      Api.collection('budgetsource')
        .then(function(response) {
          $scope.model.budgetsources = response.data;
          $scope.model.budgetsource  = $scope.model.budgetsources[0];
        });
      Api.collection('country')
        .then(function(response) {
          $scope.model.countries = response.data;
          $scope.model.country   = $scope.model.countries[0];
        });
    }
  ]);
