/**
 * Auth
 *
 * check to Backend is credentials OK
 */
(function() {
    'use strict';

    angular.module('frontend.core.services')
        .factory('Auth', [
          '$http',
          'Storage',
          'BackendConfig',
          function ($http, Storage, BackendConfig) {

            function check() {
              return login(Storage.get('username'), Storage.get('password'));
            }

            function login(username, password) {
              return $http
                .post(BackendConfig.url + '/api/auth', {}, {
                  headers: {
                    username: username,
                    password: password
                  }
                });
            }

            return {
              'isAuthenticated': function() {
                return Boolean(Storage.get('isAuthenticated'));
              },
              'check': check,
              'login': login,
              'logout': function() {
                Storage.unset('username');
                Storage.unset('password');
                Storage.unset('isAuthenticated');
              }
            };

        }]);
}());
