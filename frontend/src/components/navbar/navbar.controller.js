'use strict';

angular.module('frontend')
  .controller('NavbarCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    '$state',
    'Auth',
    function ($scope, $rootScope, $location, $state, Auth) {
      $scope.logout = function() {
        Auth.logout();
        $rootScope.isAuthenticated = false;
        $location.path('/login');
      }
    }
  ]);
