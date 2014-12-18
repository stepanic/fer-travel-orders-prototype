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

            function collection(model, where) {
              var request = {
                headers: {
                  username: Storage.get('username'), // Force read after login
                  password: Storage.get('password')
                }
              };
              request.params = {
                where: where
              };
              return $http
                .get(BackendConfig.url + '/api/' + model, request);
            }

            function myTravelOrders() {
              var request = {
                headers: {
                  username: Storage.get('username'), // Force read after login
                  password: Storage.get('password')
                }
              };
              return $http
                .get(BackendConfig.url + '/api/travelorder/myall', request);
            }

            function waitingApprove() {
              var request = {
                headers: {
                  username: Storage.get('username'), // Force read after login
                  password: Storage.get('password')
                }
              };
              return $http
                .get(BackendConfig.url + '/api/travelorder/waitingapprove', request);
            }

            function allow(id) {
              var request = {
                headers: {
                  username: Storage.get('username'), // Force read after login
                  password: Storage.get('password')
                }
              };
              var data = {
                travelorderid: id
              };
              return $http
                .put(BackendConfig.url + '/api/travelorder/allow', data, request);
            }

            function generatePDF(id, type) {
              var request = {
                headers: {
                  username: Storage.get('username'), // Force read after login
                  password: Storage.get('password')
                }
              };
              var data = {
                travelorderid: id,
                type: type
              };
              return $http
                .put(BackendConfig.url + '/api/travelorder/pdf', data, request);
            }



            return {
              'collection': collection,
              'myTravelOrders': myTravelOrders,
              'waitingApprove': waitingApprove,
              'generatePDF': generatePDF,
              'allow': allow,

              'BackendUrl': BackendConfig.url
            };

        }]);
}());
