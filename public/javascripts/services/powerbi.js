angular
    .module('Discover')
    .factory('PowerBI', ['$http', function($http){
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
