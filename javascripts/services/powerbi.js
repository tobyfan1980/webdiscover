angular
    .module('Discover')
    .factory('PowerBIService', ['$http', function($http){
        var powerService = {};
        powerService.GetToken = function(){
            // change url here for real development
            return $http.get('http://localhost:1248/api/reports?includeTokens=true');
        };

        //TODO
        // add more api call here
        return powerService;
    }]);
