angular
    .module('Discover')
    .factory('PowerBIService', ['$http', function($http){
        var powerService = {};
        powerService.GetToken = function(){
            return $http.get('/powerbi');
        };

        /*
         userService.GetById = function(userId){
            return $http.get('/users/' + userId);
        };
*/

        return powerService;
    }]);
