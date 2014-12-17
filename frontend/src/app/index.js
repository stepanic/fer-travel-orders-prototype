'use strict';

angular.module('frontend',
  [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'restangular',
    'ui.router',
    'sails.io',
    'ngTable',
    'angularMoment',
    'cfp.loadingBar',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'frontend.core'
  ])
  .constant('angularMomentConfig', {
    timezone: 'UTC'
  })
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider',
    '$sailsSocketProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $sailsSocketProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl'
        });

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/login/login.html',
          controller: 'LoginCtrl'
        });

      $stateProvider
        .state('travelorder', {
          url: '/travelorder',
          templateUrl: 'app/travelOrder/travelOrder.html',
          controller: 'TravelOrderCtrl'
        });

      $stateProvider
        .state('travelorderform', {
          url: '/travelorderform',
          templateUrl: 'app/travelOrder/travelOrderForm.html',
          controller: 'TravelOrderFormCtrl'
        });

      $urlRouterProvider.otherwise('/');

      $locationProvider
          .html5Mode(false)
      ;

      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];



    }
  ])
  .run([
    '$rootScope',
    '$location',
    '$state',
    '$sailsSocket',
    'Auth',
    function ($rootScope, $location, $state, $sailsSocket, Auth) {


      $rootScope.isAuthenticated = Auth.isAuthenticated();

      if ($rootScope.isAuthenticated !== true) {
        $location.path('/login');
      }

      $rootScope.currentState = $state.current.name;

      $rootScope.$on('$stateChangeSuccess', function () {
        $rootScope.currentState = $state.current.name;

        if ($state.current.name !== 'login') {
          if (!$rootScope.isAuthenticated) {
            $location.path('/login');
          }
        }
      });

    }
  ])
;
