'use strict';

angular.module('frontend')
  .controller('TravelOrderEnableCtrl', [
    '$scope',
    '$rootScope',
    '$filter',
    '$timeout',
    'cfpLoadingBar',
    'ngTableParams',
    'bootbox',
    'Api',
    function ($scope, $rootScope, $filter, $timeout, cfpLoadingBar, ngTableParams, bootbox, Api) {

      function Enable(id) {
        Api.allow(id)
          .then(function (response) {
            UpdateTable(0, function() {
              $scope.tableParams.reload();

              var lastPage = $scope.data.length / $scope.tableParams.$params.count;
              lastPage += 1;
              $scope.tableParams.total($scope.data.length);

              if ($scope.tableParams.$params.page >= lastPage) {
                $scope.tableParams.page($scope.tableParams.$params.page - 1);
              }
            });
            bootbox.dialog({
              title: "Putni nalog je uspješno odobren!",
              message: 'Putni nalog ID: ' + id,
              buttons: {
                danger: {
                  label: "Zatvoriti",
                  className: "btn-danger",
                  callback: function() {

                  }
                }
              }
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      $scope.Enable = Enable;

      function UpdateTable(delay, cb) {
        Api.waitingApprove()
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

      $scope.model = {};
      $scope.BackendUrl = Api.BackendUrl;

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



    }
  ]);
