/**
 * Created by gxu on 1/30/17.
 */
'use strict';

var app = angular.module('Discover');
app.controller('PowerBICtrl', [
    '$scope', '$sce', '$window', 'PowerBIService', function ($scope, $sce, $window, PowerBIService) {
        $scope.status = "OK";


        PowerBIService.GetToken().then(function onSuccess(response){

            $scope.report = response.data;
            console.log($scope.report);

/*
            var msgJson = {
                action: "loadReport",
                accessToken: report.token,
                height:600,
                width:800
            };
            var msgTxt = JSON.stringify(msgJson);

            console.log(report.token);

            $window.parent.postMessage(msgTxt, '*');
            console.log(msgTxt);
            */
            /*
             if($window.parent != $window){
             $window.parent.postMessage(msgTxt, '*');
             console.log(msgTxt);
             }
             */
            /*
             var iframe = angular.element.find(document.querySelector("ifrPowerbi")).attr('contentWindow');
             iframe.postMessage(msgTxt, '*');
             */
        }, function onError(response){
            console.log(response);
        });



    }
])