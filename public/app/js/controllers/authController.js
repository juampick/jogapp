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
            console.debug('logout!');
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

//vm.logout = function () {
//    console.debug('logout!');
//    authentication.logout()
//        .then(function(){
//            // Remove the authenticated user from local storage
//            localStorage.removeItem('user');
//
//            // Flip authenticated to false so that we no longer show UI elements dependant on the user being logged in
//            $rootScope.authenticated = false;
//
//            // Remove the current user info from $rootScope
//            $rootScope.currentUser = null;
//            toastr.success('Logout Successful', 'Goodbye!');
//        });
//};

//SignIn/Login function
//vm.login = function (isValid) {
//    if (isValid) {
//        authentication.login(vm.user)
//            .then(function () {
//                authentication.getUser()
//                    .then(function (response) {
//                        // Stringify the returned data to prepare it
//                        // to go into local storage
//                        var user = JSON.stringify(response.data.user);
//
//                        // Set the stringified user data into local storage
//                        localStorage.setItem('user', user);
//
//                        // The user's authenticated state gets flipped to
//                        // true so we can now show parts of the UI that rely
//                        // on the user being logged in
//                        $rootScope.authenticated = true;
//
//                        // Putting the user's data on $rootScope allows
//                        // us to access it anywhere across the app
//                        $rootScope.currentUser = response.data.user;
//
//                        // Everything worked out so we can now redirect to
//                        // the users state to view the data
//                        $state.go('/');
//
//                        toastr.success('Login Successful', 'Welcome!');
//                    });
//            })
//            .catch(function (error) {
//                /*
//                 vm.loginError = true;
//                 vm.loginErrorText = error.data.error;
//                 */
//
//                toastr.error(error.data.error, 'Error');
//            });
//    }
//};
//SignUp function
//vm.signup = function (isValid) {
//    if (isValid) {
//        // Use Satellizer's $auth service to login
//        authentication.signUp(vm.user)
//            .then(function (response) {
//                //We set the token to make login automatically
//                authentication.setToken(response);
//
//                authentication.getUser()
//                    .then(function (response) {
//                        // Stringify the returned data to prepare it
//                        // to go into local storage
//                        var user = JSON.stringify(response.data.user);
//
//                        // Set the stringified user data into local storage
//                        localStorage.setItem('user', user);
//
//                        // The user's authenticated state gets flipped to
//                        // true so we can now show parts of the UI that rely
//                        // on the user being logged in
//                        $rootScope.authenticated = true;
//
//                        // Putting the user's data on $rootScope allows
//                        // us to access it anywhere across the app
//                        $rootScope.currentUser = response.data.user;
//
//                        // Everything worked out so we can now redirect to
//                        // the users state to view the data
//                        $state.go('/');
//
//                        toastr.success('Account created successfully', 'Welcome!');
//                    });
//            })
//            .catch(function (error) {
//                toastr.error(error.data.error, 'Error');
//            });
//    }
//}