(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$rootScope', 'authentication', '$state', 'toastr'];

    function AuthController($rootScope, authentication, $state, toastr) {
        var vm = this;

        vm.user = {};

        //SignIn/Login function
        vm.login = function (isValid) {
            if (isValid) {
                authentication.login(vm.user)
                    .then(function () {
                        $state.go('/');
                        toastr.success('Login Successful', 'Welcome!');
                    })
                    .catch(function (error) {
                        console.debug(error);
                        toastr.error(error.data.error, 'Error');
                    });
            }
        };

        //Logout function
        vm.logout = function () {
            authentication.logout()
                .then(function () {
                    toastr.success('Logout Successful', 'Goodbye!');
                });
        };

        //SignUp function
        vm.signup = function (isValid) {
            if (isValid) {
                authentication.signUp(vm.user)
                    .then(function(){
                        $state.go('/');
                        toastr.success('Account created successfully', 'Welcome!');
                    })
                    .catch(function(error){
                        toastr.error(error.data.error, 'Error');
                    });
            }
        };
    }
})();