/**
 * Created by gxu on 1/30/17.
 */
'use strict';

var app = angular.module('Discover');
app.controller('PowerBICtrl', [
    '$scope', '$sce', '$window', 'PowerBI', function ($scope, $sce, $window, PowerBI) {
        $scope.status = "OK";

        $scope.onViewReport = function () {
            PowerBI.GetToken().success(function(report){
                $scope.embedToken = report.token;
                $scope.powerbiSrc = $sce.trustAsResourceUrl(report.embedUrl);
                console.log(report);


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
            }).error(function(data, status){
                console.log(status);
            })
        };


    }
])