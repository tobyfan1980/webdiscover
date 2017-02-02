/**
 * Created by gxu on 1/30/17.
 */
var app = angular.module('Discover', ['ui.router', 'powerbi'])
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
            .state('iframe', {
                url: '/iframe',
                templateUrl: 'views/iframe.html',
                controller: 'IFrameCtrl'
            })
        $urlRouterProvider.otherwise('/home');
    }]

);