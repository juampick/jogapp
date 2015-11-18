(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$state', 'authentication', 'toastr'];

    function AuthController($state, authentication, toastr) {
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
                        toastr.error('Invalid Credentials. Please try again', 'Error');
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
                vm.user.role = 'user'; //For now: we currently create all the users with the common role: user
                authentication.signUp(vm.user)
                    .then(function () {
                        $state.go('/');
                        toastr.success('Account created successfully', 'Welcome!');
                    })
                    .catch(function (error) {
                        toastr.error(error.data.error, 'Error');
                    });
            }
        };
    }
})();