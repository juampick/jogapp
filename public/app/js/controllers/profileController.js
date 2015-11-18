(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$uibModal', '$state', 'authentication', 'roles', 'toastr'];
    function ProfileController($scope, $uibModal, $state, authentication, roles, toastr) {
        var vm = this;
        vm.authenticated = authentication.authenticated();
        vm.currentUser = authentication.currentUser();
        vm.logout = authentication.logout;

        $scope.$watch(authentication.authenticated, function (authenticated) {
            vm.authenticated = authenticated;
            vm.currentUser = authentication.currentUser();
        });

        vm.user = {};
        angular.forEach(roles, function (key, value) {
            if (key.key === vm.currentUser.role) {
                vm.user.role = key.value;
            }
        });

        vm.modalTitle = 'Change Password';
        vm.open = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/change_pwd_modal.html',
                controller: 'ModalInstanceChangePwdController',
                size: 'sm',
                resolve: {
                    title: function () {
                        return vm.modalTitle;
                    }
                }
            });

            modalInstance.result.then(function () {
                toastr.success('Password Changed successfully. Please Sign-in again');
                authentication.logout()
                    .then(function () {
                        $state.go('signin');
                    });

            }, function () {
                //dismiss action
            });
        };
    }
})();

