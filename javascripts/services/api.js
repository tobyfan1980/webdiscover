/**
 * Created by gxu on 2/8/17.
 */
angular
    .module('Discover')
    .factory('APIService', ['$http', function($http){
        var apiService = {};
        apiService.greeting = function(){
            //return $http.get('http://localhost:8080/greeting');
            return $http.get('http://localhost:8999/api/rest/operate/is/login');
        };



        return apiService;
    }]);
