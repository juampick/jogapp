(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('AdminCreateController', AdminCreateController);

    AdminCreateController.$inject = ['$scope', '$state', 'toastr', 'authentication', 'user', 'roles'];

    function AdminCreateController($scope, $state, toastr, authentication, userService, roles) {
        var vm = this;

        //Auth
        vm.authenticated = authentication.authenticated();
        vm.currentUser = authentication.currentUser();
        $scope.$watch( authentication.authenticated, function ( authenticated ) {
            vm.authenticated = authenticated;
            vm.currentUser = authentication.currentUser();
        });

        vm.user = {};
        vm.roles = [];

        if (vm.currentUser.role === 'user_manager'){
            angular.forEach(roles, function(key, value){ //filter only roles that UM can handle
                if (key.key != 'user_manager' && key.key != 'admin'){
                    vm.roles.push(key)
                }
            });
        } else {
            vm.roles = roles;
        }
        //newUser function
        vm.new = function (isValid) {
            if (isValid) {
                var userToSend = angular.copy(vm.user);
                userToSend.role = userToSend.role.key;
                userService.save(userToSend)
                    .then(function(){
                        $state.go('admin');
                        toastr.success('User created successfully');
                    })
                    .catch(function(error){
                        toastr.error(error.data.error, 'Error');
                    });
            }
        };

    }
})();