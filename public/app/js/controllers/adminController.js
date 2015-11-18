(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$scope', 'toastr', 'authentication', 'user'];

    function AdminController($scope, toastr, authentication, user) {
        var vm = this;

        //Auth
        vm.authenticated = authentication.authenticated();
        vm.currentUser = authentication.currentUser();

        $scope.$watch(authentication.authenticated, function (authenticated) {
            vm.authenticated = authenticated;
            vm.currentUser = authentication.currentUser();
        });

        vm.usersList = [];
        // Pagination //
        vm.currentPage = 1;
        vm.itemsPerPage = 3;

        function getUsers() {
            user.get()
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

        vm.deleteUser = function (userParam) {
            user.delete(userParam.id)
                .then(function () {
                    getUsers();
                    toastr.success('User deleted successfully');
                })
                .catch(function () {
                    toastr.error('There was an error deleting the USer');
                });

        };

        vm.refresh = function () {
            toastr.info('Loading users...');
            getUsers();
            toastr.clear();
        };
    }
})();