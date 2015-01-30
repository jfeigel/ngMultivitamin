'use strict';

var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap'
])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../views/example.html',
                controller: 'ExampleController'
            });

        $urlRouterProvider.otherwise("/");
    }
]);