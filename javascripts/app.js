/**
 * Created by gxu on 1/30/17.
 */
var app = angular.module('Discover', ['ui.router', 'powerbi', 'ng-echarts'])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html'

            })
            .state('powerbi', {
                url: '/powerbi',
                templateUrl: 'views/powerbi.html',
                controller: 'PowerBICtrl'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact.html'
            })
            .state('api', {
                url: '/api',
                controller: 'APICtrl',
                templateUrl: 'views/api.html'
            })
            .state('chart', {
                url: '/chart',
                templateUrl: 'views/chart.html',
                controller: 'ChartCtrl'
            });
        $urlRouterProvider.otherwise('/home');
    }]

);