/**
 * Created by gxu on 1/30/17.
 */
/**
 * Created by gxu on 1/30/17.
 */
'use strict';

var app = angular.module('Discover');
app.controller('IFrameCtrl', [
    '$scope', '$sce', '$window', function ($scope, $sce, $window) {
        $scope.status = "OK";
        $scope.click = function() {
            var iframe = document.getElementById("inner").contentWindow;

            iframe.postMessage("Hello iframe", '*');
        }
    }
])