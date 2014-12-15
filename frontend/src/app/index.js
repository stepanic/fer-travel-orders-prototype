'use strict';

angular.module('frontend', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router'])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl'
        });

      $urlRouterProvider.otherwise('/');

      // Yeah we wanna to use HTML5 urls!
      $locationProvider
          .html5Mode(true)
          .hashPrefix('!')
      ;
    }
  ])
;
