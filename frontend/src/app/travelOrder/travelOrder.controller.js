'use strict';

angular.module('frontend')
  .controller('TravelOrderCtrl', [
    '$scope',
    '$rootScope',
    '$filter',
    '$timeout',
    'cfpLoadingBar',
    'ngTableParams',
    'Api',
    function ($scope, $rootScope, $filter, $timeout, cfpLoadingBar, ngTableParams, Api) {

      function UpdateTable(delay) {
        Api.myTravelOrders()
          .then(function(response) {
            cfpLoadingBar.start();
            cfpLoadingBar.inc();
            $timeout(function() {
              $scope.data = response.data;
              cfpLoadingBar.complete();
            }, delay);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      $scope.GeneratePDF = function(id, type) {
        Api.generatePDF(id, type)
          .then(function(response) {
            UpdateTable(2000);
          })
          .catch(function(error) {
            console.log(error);
          });
      };

      $scope.model = {};

      $scope.data = []
      UpdateTable(0);

      $scope.BackendUrl = Api.BackendUrl;

      // ngTable
      $scope.tableParams = new ngTableParams({
          page: 1,
          count: 10,
          sorting: {
            id: 'asc'
          }
      },{
          total: $scope.data.length,
          getData: function($defer, params) {
              var orderedData = params.sorting() ?
                                $filter('orderBy')($scope.data, params.orderBy()) :
                                $scope.data;
              $scope.data = orderedData;
              $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          }
      });


    }
  ]);
