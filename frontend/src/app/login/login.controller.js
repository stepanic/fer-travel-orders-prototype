'use strict';

angular.module('frontend')
  .controller('LoginCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'Storage',
    'Auth',
    function ($scope, $rootScope, $location, Storage, Auth) {

      $scope.model = {};

      $scope.model.username = '';
      $scope.model.password = '';

      $scope.loginSubmit = function() {
        Auth.login($scope.model.username, $scope.model.password)
          .then(function (response) {
            Storage.set('username', $scope.model.username);
            Storage.set('password', $scope.model.password);
            Storage.set('isAuthenticated', true);
            $rootScope.isAuthenticated = true;
            $location.path('/travelorder');
          })
          .catch(function (error) {
            Storage.set('isAuthenticated', false);
          });
      };
    }
  ]);
