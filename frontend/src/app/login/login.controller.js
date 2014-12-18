'use strict';

angular.module('frontend')
  .controller('LoginCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'bootbox',
    'Storage',
    'Auth',
    'Api',
    function ($scope, $rootScope, $location, bootbox, Storage, Auth, Api) {

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

            Api.collection('user', {
              username: $scope.model.username
            })
              .then(function(result) {
                var user = {
                  firstName: result.data[0].firstName,
                  lastName: result.data[0].lastName,
                  email: result.data[0].email,
                  roles: result.data[0].roles,
                  department: result.data[0].department
                };

                if (user.roles.indexOf("DEAN") > -1) {
                  $rootScope.isDean = true;
                } else {
                  $rootScope.isDean = false;
                }
                if (user.roles.indexOf("HEAD") > -1) {
                  $rootScope.isDepartmentHead = true;
                } else {
                  $rootScope.isDepartmentHead = false;
                }

                for (var i = 0; i < user.roles.length; i++) {
                  if (user.roles[i]) {

                  }
                }

                Storage.set('user', JSON.stringify(user));
                $rootScope.user = user;
                $location.path('/travelorder');
              });

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
