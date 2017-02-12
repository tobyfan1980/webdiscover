/**
 * Created by gxu on 2/8/17.
 */
'use strict';

var app = angular.module('Discover');
app.controller('APICtrl', [
    '$scope', 'APIService', function ($scope, APIService) {
        $scope.status = "OK";


        APIService.greeting().then(function onSuccess(response){

            $scope.data = response.data;
            console.log($scope.data);


        }, function onError(response){
            console.log(response);
        });



    }
])