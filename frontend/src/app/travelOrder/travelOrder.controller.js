'use strict';

angular.module('frontend')
  .controller('TravelOrderCtrl', [
    '$scope',
    '$rootScope',
    '$filter',
    'ngTableParams',
    'amMoment',
    'Api',
    function ($scope, $rootScope, $filter, ngTableParams, amMoment, Api) {

      $scope.model = {};

      $scope.data = []
      $scope.BackendUrl = Api.BackendUrl;

      Api.myTravelOrders()
        .then(function(response) {
          $scope.data = response.data;
          // console.log(response);
          console.log($scope.data);
        })
        .catch(function(error) {
          console.log(error);
        });

      // Date converter
      // $scope.ConvertDate = function (datetime) {
      //   var c = amMoment.utc(datetime).format('DD.MM.YYYY. HH:mm');
      //   console.log(c);
      //   console.log(amMoment);
      //   return c;
      // };

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

      $scope.editId = -1;

      $scope.setEditId =  function(pid) {
          $scope.editId = pid;
      }

    }
  ]);
