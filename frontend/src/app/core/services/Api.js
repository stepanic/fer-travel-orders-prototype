/**
 * Api
 *
 * access to Backend
 */
(function() {
    'use strict';

    angular.module('frontend.core.services')
        .factory('Api', [
          '$http',
          'Storage',
          'BackendConfig',
          function ($http, Storage, BackendConfig) {

            var defaultRequest = {
              headers: {
                username: Storage.get('username'),
                password: Storage.get('password')
              }
            }

            function collection(model, params) {
              var request = defaultRequest;
              return $http
                .get(BackendConfig.url + "/api/" + model, request);
            }

            function myTravelOrders() {
              var request = defaultRequest;
              return $http
                .get(BackendConfig.url + "/api/travelorder/myall", request);
            }



            return {
              'collection': collection,
              'myTravelOrders': myTravelOrders,

              'BackendUrl': BackendConfig.url
            };

        }]);
}());
