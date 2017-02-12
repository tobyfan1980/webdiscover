/**
 * Created by gxu on 1/30/17.
 */
angular
    .module('Discover')
    .controller('MenuCtrl', //[
        //'$scope', 'Menus', 'Session',
        //function($scope, menus, session){
        function($scope, Menus, Session){
            $scope.menus = Menus.default_menu;

        }
    );
