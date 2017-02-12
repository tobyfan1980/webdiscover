/**
 * Created by gxu on 2/10/17.
 */
'use strict';

var app = angular.module('Discover');
app.controller('ChartCtrl',
    function ($scope, $interval, $timeout) {
        $scope.status = "OK";
        $scope.lineConfig = {
            theme: 'default',
            dataLoaded: true
        };

        $scope.showAlertLines = true;

        $scope.showAlertLineChanged = function () {
            if($scope.showAlertLines){
                console.log("show alerts");

            }else{
                console.log("hide alerts");

            }

        };

        $scope.inspectTypes = ['temperature', 'humidity'];
        $scope.selectedInspect = 'temperature';

        $scope.displaySelectedInspect = function(inspect){
            $scope.selectedInspect = inspect;
            console.log("display chart of " + inspect);
        };

        var curMilliSec = Date.now();

        // 温度 [20, 50]
        var temperatureTSData = [];

        var generateTemperature = function(){
            return Math.round(Math.random()*30)+20;
        };

        for(var i=0; i<60; i++){
            temperatureTSData.push([
                curMilliSec - (60-1-i)*5000,
                generateTemperature()
            ]);
        }

        var temperatureAlertThresholds = {
            redUpper: 48,
            yellowUpper: 44,
            yellowLower: 26,
            redLower: 22
        };

        // 湿度 [40%, 70%]
        var rhTSData = [];
        var generateRH = function () {
            return Math.round(Math.random()*30)+40;
        };

        for(var i=0; i<60; i++){
            rhTSData.push([
                curMilliSec - (60-1-i)*5000,
                generateRH()
            ]);
        }

        var rhAlertThresholds = {
            redUpper: 68,
            yellowUpper: 64,
            yellowLower: 46,
            redLower: 42
        };

        var telemetrySeriesTemplate = {
            type: 'line',

            lineStyle: {
                normal:{
                    color: 'blue',
                    width: 4,
                    shadowColor: 'rgba(100, 100, 100, 0.5)',
                    shadowBlur: 4
                }
            },
            label: {
                normal: {
                    show: false,
                    position: 'top'
                }
            },
            itemStyle:{
                normal:{
                    //color: 'green',
                    shadowColor: 'rgba(100, 100, 100, 0.5)',
                    shadowBlur: 4
                }
            },

            symbol: 'circle',
            symbolSize: 8,
            showAllSymbol: false,
            smooth: true,
            sampling: 'average',
//            data: temperatureTSData,

            markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值',
                    silent: true,
                    label: {
                        normal:{
                            show: true,
                            formatter: '{c}',
                            textStyle:{
                                color: 'yellow',
                                fontSize: 11,
                                fontWeight: 'bold'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {color: 'rgba(70,0,70,0.5)'}
                    }
                },
                    {
                        type: 'min',
                        name: '最小值',
                        silent: true,
                        label: {
                            normal:{
                                show: true,
                                formatter: '{c}',
                                textStyle:{
                                    color: 'yellow',
                                    fontSize: 11,
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        itemStyle:{
                            normal: {color: 'rgba(40,0,40,0.5)'}

                        }
                    }
                ]
            }

        };


        var alertSeriesTemplate = {
            //name: '红色上阈',
            type: 'line',
            connectNulls: true,

            lineStyle:{
                normal:{
                    //color: 'red',
                    width: 2,
                    type: 'dashed'
                }
            },
            symbol: 'diamond',
            symbolSize: 4,
            showSymbol: false
            //data: [[temperatureTSData[0][0], 46],
            //    [temperatureTSData[temperatureTSData.length-1][0], 46]]
        };
       

        var tooltipObj = {
            trigger: 'item',
            showDelay: 100,
            hideDelay: 100,
            formatter: function(a){
                var relVal = "";

                if(a.value.constructor===Array){
                    var timeObj = new Date(a.value[0]);
                    var timeStr = timeObj.getHours() + ":" + timeObj.getMinutes() + ":" + timeObj.getSeconds();

                    relVal += timeStr + "<br/>";
                    relVal += a.seriesName + ":" + a.value[1];
                }
                else{
                    relVal += a.name + ":" + a.value;
                }

                if(a.seriesName == "温度"){
                    relVal += "°C";
                }
                else if(a.seriesName == "湿度"){
                    relVal += "%";
                }

                return relVal;
            }

        };

        var lineOptionTemplate = {
            toolbox: {
                show: true,
                left: '40%',
                top: 10,
                feature: {
                    //mark: {show: true},
                    //dataView: {show: true, readOnly: false},
                    //magicType: {show: true, type: ['line', 'bar']},
                    dataZoom: {
                        show: true,
                        yAxisIndex: false
                    },
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },

            calculable: true,
            xAxis: [
                {
                    type: 'time',
                    boundaryGap: ['0%', 300]
                    //splitNumber: 6,

                }
            ],
            yAxis: [
                {
                    type: 'value'

                }
            ],

            visualMap: {
                top:5,
                right:5,
                type: 'piecewise',
                dimension: 1,
                pieces: [


                ],
                outOfRange: {
                    color: '#999'
                },
                textStyle: {
                    color: '#222'
                },
                backgroundColor: 'rgba(200,200,200,0.5)'
            },

            series: [
            ]
        };

        var setVisualMap = function (lineOptionObj, alertThresholds) {
            lineOptionObj.visualMap.pieces.push(
                {
                    min: alertThresholds.redUpper,
                    color: 'red',
                    label: '高红色报警'
                }
            );
            lineOptionObj.visualMap.pieces.push(
                {
                    min: alertThresholds.yellowUpper,
                    max: alertThresholds.redUpper,
                    color: 'orange',
                    label: '高黄色报警'
                }
            );
            lineOptionObj.visualMap.pieces.push(
                {
                    min: alertThresholds.yellowLower,
                    max: alertThresholds.yellowUpper,

                    color: 'green',
                    label: '正常'
                }
            );
            lineOptionObj.visualMap.pieces.push(
                {
                    min: alertThresholds.redLower,
                    max: alertThresholds.yellowLower,

                    color: 'orange',
                    label: '低黄色报警 '
                }
            );
            lineOptionObj.visualMap.pieces.push(
                {
                    max: alertThresholds.redLower,

                    color: 'red',
                    label: '低红色报警 '
                }
            );
        };

        /////////////// set up line options /////////////////

        // temperature
        var temperatureSeries = JSON.parse(JSON.stringify(telemetrySeriesTemplate));
        temperatureSeries.name = "温度";
        temperatureSeries.data = temperatureTSData;
        
        // without alert lines
        var temperatureLineOptionWithoutAlertLines = JSON.parse(JSON.stringify(lineOptionTemplate));
        temperatureLineOptionWithoutAlertLines.tooltip = tooltipObj;
        temperatureLineOptionWithoutAlertLines.name = "气温";
        temperatureLineOptionWithoutAlertLines.yAxis[0].min = 10;
        temperatureLineOptionWithoutAlertLines.yAxis[0].max = 60;
        temperatureLineOptionWithoutAlertLines.yAxis[0].axisLabel = {
            formatter: '{value} °C'
        };

        setVisualMap(temperatureLineOptionWithoutAlertLines, temperatureAlertThresholds);
        
        temperatureLineOptionWithoutAlertLines.series.push(temperatureSeries);

        
        // with alert lines
        var temperatureLineOptionWithAlertLines = JSON.parse(JSON.stringify(lineOptionTemplate));
        temperatureLineOptionWithAlertLines.tooltip = tooltipObj;
        temperatureLineOptionWithAlertLines.name = "气温";
        temperatureLineOptionWithAlertLines.yAxis[0].min = 10;
        temperatureLineOptionWithAlertLines.yAxis[0].max = 60;
        temperatureLineOptionWithAlertLines.yAxis[0].axisLabel = {
            formatter: '{value} °C'
        };

        setVisualMap(temperatureLineOptionWithAlertLines, temperatureAlertThresholds);
        temperatureLineOptionWithAlertLines.series.push(temperatureSeries);


        var temperatureAlertLineRedUpper = JSON.parse(JSON.stringify(alertSeriesTemplate));
        temperatureAlertLineRedUpper.name = "红色上阈";
        temperatureAlertLineRedUpper.lineStyle.normal.color = 'red';
        temperatureAlertLineRedUpper.data = [
            [temperatureTSData[0][0], temperatureAlertThresholds.redUpper],
            [temperatureTSData[temperatureTSData.length-1][0], temperatureAlertThresholds.redUpper]
        ];

        var temperatureAlertLineYellowUpper = JSON.parse(JSON.stringify(alertSeriesTemplate));
        temperatureAlertLineYellowUpper.name = "黄色上阈";
        temperatureAlertLineYellowUpper.lineStyle.normal.color = 'orange';
        temperatureAlertLineYellowUpper.data = [
            [temperatureTSData[0][0], temperatureAlertThresholds.yellowUpper],
            [temperatureTSData[temperatureTSData.length-1][0], temperatureAlertThresholds.yellowUpper]
        ];

        var temperatureAlertLineRedLower = JSON.parse(JSON.stringify(alertSeriesTemplate));
        temperatureAlertLineRedLower.name = "红色下阈";
        temperatureAlertLineRedLower.lineStyle.normal.color = 'red';
        temperatureAlertLineRedLower.data = [
            [temperatureTSData[0][0], temperatureAlertThresholds.redLower],
            [temperatureTSData[temperatureTSData.length-1][0], temperatureAlertThresholds.redLower]
        ];

        var temperatureAlertLineYellowLower = JSON.parse(JSON.stringify(alertSeriesTemplate));
        temperatureAlertLineYellowLower.name = "黄色下阈";
        temperatureAlertLineYellowLower.lineStyle.normal.color = 'orange';
        temperatureAlertLineYellowLower.data = [
            [temperatureTSData[0][0], temperatureAlertThresholds.yellowLower],
            [temperatureTSData[temperatureTSData.length-1][0], temperatureAlertThresholds.yellowLower]
        ];

        temperatureLineOptionWithAlertLines.series.push(temperatureAlertLineRedUpper);
        temperatureLineOptionWithAlertLines.series.push(temperatureAlertLineYellowUpper);
        temperatureLineOptionWithAlertLines.series.push(temperatureAlertLineYellowLower);
        temperatureLineOptionWithAlertLines.series.push(temperatureAlertLineRedLower);


        // humidity
        var humiditySeries = JSON.parse(JSON.stringify(telemetrySeriesTemplate));
        humiditySeries.name = "湿度";
        humiditySeries.data = rhTSData;

        // without alert lines
        var humidityLineOptionWithoutAlertLines = JSON.parse(JSON.stringify(lineOptionTemplate));
        humidityLineOptionWithoutAlertLines.tooltip = tooltipObj;
        humidityLineOptionWithoutAlertLines.name = "湿度";
        humidityLineOptionWithoutAlertLines.yAxis[0].min = 30;
        humidityLineOptionWithoutAlertLines.yAxis[0].max = 80;
        humidityLineOptionWithoutAlertLines.yAxis[0].axisLabel = {
            formatter: '{value} %'
        };

        setVisualMap(humidityLineOptionWithoutAlertLines, rhAlertThresholds);

        humidityLineOptionWithoutAlertLines.series.push(humiditySeries);


        // with alert lines
        var humidityLineOptionWithAlertLines = JSON.parse(JSON.stringify(lineOptionTemplate));
        humidityLineOptionWithAlertLines.tooltip = tooltipObj;
        humidityLineOptionWithAlertLines.name = "湿度";
        humidityLineOptionWithAlertLines.yAxis[0].min = 30;
        humidityLineOptionWithAlertLines.yAxis[0].max = 80;
        humidityLineOptionWithAlertLines.yAxis[0].axisLabel = {
            formatter: '{value} %'
        };

        setVisualMap(humidityLineOptionWithAlertLines, rhAlertThresholds);
        humidityLineOptionWithAlertLines.series.push(humiditySeries);


        var humidityAlertLineRedUpper = JSON.parse(JSON.stringify(alertSeriesTemplate));
        humidityAlertLineRedUpper.name = "红色上阈";
        humidityAlertLineRedUpper.lineStyle.normal.color = 'red';
        humidityAlertLineRedUpper.data = [
            [rhTSData[0][0], rhAlertThresholds.redUpper],
            [rhTSData[rhTSData.length-1][0], rhAlertThresholds.redUpper]
        ];

        var humidityAlertLineYellowUpper = JSON.parse(JSON.stringify(alertSeriesTemplate));
        humidityAlertLineYellowUpper.name = "黄色上阈";
        humidityAlertLineYellowUpper.lineStyle.normal.color = 'orange';
        humidityAlertLineYellowUpper.data = [
            [rhTSData[0][0], rhAlertThresholds.yellowUpper],
            [rhTSData[rhTSData.length-1][0], rhAlertThresholds.yellowUpper]
        ];

        var humidityAlertLineRedLower = JSON.parse(JSON.stringify(alertSeriesTemplate));
        humidityAlertLineRedLower.name = "红色下阈";
        humidityAlertLineRedLower.lineStyle.normal.color = 'red';
        humidityAlertLineRedLower.data = [
            [rhTSData[0][0], rhAlertThresholds.redLower],
            [rhTSData[rhTSData.length-1][0], rhAlertThresholds.redLower]
        ];

        var humidityAlertLineYellowLower = JSON.parse(JSON.stringify(alertSeriesTemplate));
        humidityAlertLineYellowLower.name = "黄色下阈";
        humidityAlertLineYellowLower.lineStyle.normal.color = 'orange';
        humidityAlertLineYellowLower.data = [
            [rhTSData[0][0], rhAlertThresholds.yellowLower],
            [rhTSData[rhTSData.length-1][0], rhAlertThresholds.yellowLower]
        ];

        humidityLineOptionWithAlertLines.series.push(humidityAlertLineRedUpper);
        humidityLineOptionWithAlertLines.series.push(humidityAlertLineYellowUpper);
        humidityLineOptionWithAlertLines.series.push(humidityAlertLineYellowLower);
        humidityLineOptionWithAlertLines.series.push(humidityAlertLineRedLower);
        
        
        // scope line options
        $scope.temperatureLineOption = temperatureLineOptionWithAlertLines;
        $scope.temperatureLineOption2 = temperatureLineOptionWithoutAlertLines;
        $scope.rhLineOption = humidityLineOptionWithAlertLines;
        $scope.rhLineOption2 = humidityLineOptionWithoutAlertLines;

        console.log("humidity line options");
        console.log($scope.rhLineOption);
        console.log($scope.rhLineOption2);

        $interval(function () {
            $scope.lineConfig.dataLoaded = false;
            temperatureTSData.splice(0,1);
            rhTSData.splice(0,1);

            var newCurTimeTick = Date.now();
            temperatureTSData.push([newCurTimeTick, generateTemperature()]);
            rhTSData.push([newCurTimeTick, generateRH()]);

            if($scope.showAlertLines){
                var alertsTemps = [
                    temperatureAlertThresholds.redUpper,
                    temperatureAlertThresholds.yellowUpper,
                    temperatureAlertThresholds.yellowLower,
                    temperatureAlertThresholds.redLower];

                var alertsHumidity = [
                    rhAlertThresholds.redUpper,
                    rhAlertThresholds.yellowUpper,
                    rhAlertThresholds.yellowLower,
                    rhAlertThresholds.redLower];
                for(var i=0; i<4; i++) {
                    if (i + 1 < $scope.temperatureLineOption.series.length) {

                        $scope.temperatureLineOption.series[1 + i].data = [
                            [temperatureTSData[0][0], alertsTemps[i]],
                            [temperatureTSData[temperatureTSData.length - 1][0], alertsTemps[i]]
                        ];
                    }else{
                        console.log("temperature lineOption series incorrect");

                    }

                    if (i + 1 < $scope.rhLineOption.series.length) {

                        $scope.rhLineOption.series[1 + i].data = [
                            [rhTSData[0][0], alertsHumidity[i]],
                            [rhTSData[rhTSData.length - 1][0], alertsHumidity[i]]
                        ];
                    }else{
                        console.log("humidity lineOption series incorrect");

                    }
                }
            }

            //$scope.lineOption.series[0].data = temperatures;

            $scope.lineConfig.dataLoaded = true;
        },5000);


    }
);