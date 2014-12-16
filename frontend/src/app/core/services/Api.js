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

            function collection(model, where) {
              var request = defaultRequest;
              request.params = {
                where: where
              };
              return $http
                .get(BackendConfig.url + "/api/" + model, request);
            }

            function myTravelOrders() {
              var request = {
                headers: {
                  username: Storage.get('username'), // Force read after login
                  password: Storage.get('password')
                }
              };
              return $http
                .get(BackendConfig.url + "/api/travelorder/myall", request);
            }

            function generatePDF(id, type) {
              var request = defaultRequest;
              var data = {
                travelorderid: id,
                type: type
              }
              return $http
                .put(BackendConfig.url + "/api/travelorder/pdf", data, request);
            }



            return {
              'collection': collection,
              'myTravelOrders': myTravelOrders,
              'generatePDF': generatePDF,

              'BackendUrl': BackendConfig.url
            };

        }]);
}());
