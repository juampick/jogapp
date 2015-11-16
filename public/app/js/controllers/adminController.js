(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$scope', '$state', 'filterFilter', 'timeEntry', 'toastr', 'authentication', 'user'];

    function AdminController($scope, $state, filterFilter, timeEntryService, toastr, authentication, userService) {
        var vm = this;

        //Auth
        vm.authenticated = authentication.authenticated();
        vm.currentUser = authentication.currentUser();

        $scope.$watch( authentication.authenticated, function ( authenticated ) {
            vm.authenticated = authenticated;
            vm.currentUser = authentication.currentUser();
        });

        vm.usersList = [];

        function getUsers() {
            userService.get()
                .then(function (response) {
                    vm.usersList = [];
                    vm.usersList = response;
                })
                .catch(function () {

                })
                .finally(function () {

                });
        }
        getUsers();

        vm.deleteUser = function(user){
            console.debug(user);
            userService.delete(user.id)
                .then(function(){
                    getUsers();
                })
                .catch(function(){

                });

        };
    }
})();