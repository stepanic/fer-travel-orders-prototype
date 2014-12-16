'use strict';

angular.module('frontend')
  .controller('LoginCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'bootbox',
    'Storage',
    'Auth',
    function ($scope, $rootScope, $location, bootbox, Storage, Auth) {

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
            bootbox.dialog({
              title: "Pogreška: NISTE prijavljeni u sustav!",
              message: "Korisničko ime ili lozinka nisu ispravni!",
              buttons: {
                danger: {
                  label: "Zatvoriti",
                  className: "btn-danger",
                  callback: function() {

                  }
                }
              }
            });
          });
      };
    }
  ]);
