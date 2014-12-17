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

      function UpdateTable(delay, cb) {
        Api.myTravelOrders()
          .then(function(response) {
            cfpLoadingBar.start();
            cfpLoadingBar.inc();
            $timeout(function() {
              data = response.data;
              $scope.data = data;
              cfpLoadingBar.complete();
              if (cb) {
                cb();
              }
            }, delay);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      $scope.GeneratePDF = function(id, type) {
        Api.generatePDF(id, type)
          .then(function(response) {
            UpdateTable(2000, function() {
              $scope.tableParams.reload();
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      };

      $scope.model = {};

      var data = [];
      $scope.data = data;



      UpdateTable(0, function() {
        // ngTable
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 5,
            sorting: {
              'id': 'desc'
            }
        },{
            total: data.length,
            getData: function($defer, params) {
                var orderedData = params.sorting() ?
                                  $filter('orderBy')(data, params.orderBy()) :
                                  data;

                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
      });



      console.log($scope.tableParams);

      $scope.BackendUrl = Api.BackendUrl;





    }
  ]);
