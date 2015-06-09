'use strict';

/**
 * @ngdoc overview
 * @name calculadoraSalarialApp
 * @description
 * # calculadoraSalarialApp
 *
 * Main module of the application.
 */
angular
  .module('calculadoraSalarialApp', [
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
