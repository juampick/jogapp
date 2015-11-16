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
        // Pagination //
        vm.currentPage = 1;
        vm.itemsPerPage = 3;

        function getUsers() {
            userService.get()
                .then(function (response) {
                    vm.usersList = [];
                    vm.usersList = response;
                    vm.totalItems = vm.usersList.length;
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

        vm.refresh = function(){
            toastr.info('Loading users...');
            getUsers();
            toastr.clear();
        };
    }
})();