'use strict';

angular.module('frontend')
  .controller('NavbarCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'Auth',
    function ($scope, $rootScope, $location, Auth) {

      // $rootScope.$watch('isAuthenticated', function() {
      //   console.log($rootScope.isAuthenticated);
      // });

      $scope.logout = function() {
        Auth.logout();
        $rootScope.isAuthenticated = false;
        $location.path('/login');
      }
    }
  ]);
