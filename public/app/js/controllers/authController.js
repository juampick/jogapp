angular
    .module('jogApp')
    .controller('AuthController', AuthController);

function AuthController($auth, $state, $http, $rootScope, urls, toastr){
    var vm = this;

    vm.user = {};

    vm.loginError = false;
    vm.loginErrorText = '';
    vm.signUpError = false;
    vm.signUpErrorText = '';

    //SignIn/Login function
    vm.login = function(isValid) {
        if (isValid) {
            // Use Satellizer's $auth service to login
            $auth.login(vm.user)
                .then(function () {
                    $http.get(urls.BASE_API + '/authenticate/user')
                        .then(function (response) {
                            // Stringify the returned data to prepare it
                            // to go into local storage
                            var user = JSON.stringify(response.data.user);

                            // Set the stringified user data into local storage
                            localStorage.setItem('user', user);

                            // The user's authenticated state gets flipped to
                            // true so we can now show parts of the UI that rely
                            // on the user being logged in
                            $rootScope.authenticated = true;

                            // Putting the user's data on $rootScope allows
                            // us to access it anywhere across the app
                            $rootScope.currentUser = response.data.user;

                            // Everything worked out so we can now redirect to
                            // the users state to view the data
                            $state.go('/');

                            toastr.success('Login Successful', 'Welcome!');
                        });
                })
                .catch(function (error) {
                    /*
                     vm.loginError = true;
                     vm.loginErrorText = error.data.error;
                     */

                    toastr.error(error.data.error, 'Error');
                });
        }
    }

    //SignUp function
    vm.signup = function(isValid) {
        if (isValid) {
            // Use Satellizer's $auth service to login
            $auth.signup(vm.user)
                .then(function (response) {
                    //We set the token to make login automatically
                    $auth.setToken(response);

                    $http.get(urls.BASE_API + '/authenticate/user')
                        .then(function (response) {
                            // Stringify the returned data to prepare it
                            // to go into local storage
                            var user = JSON.stringify(response.data.user);

                            // Set the stringified user data into local storage
                            localStorage.setItem('user', user);

                            // The user's authenticated state gets flipped to
                            // true so we can now show parts of the UI that rely
                            // on the user being logged in
                            $rootScope.authenticated = true;

                            // Putting the user's data on $rootScope allows
                            // us to access it anywhere across the app
                            $rootScope.currentUser = response.data.user;

                            // Everything worked out so we can now redirect to
                            // the users state to view the data
                            $state.go('/');

                            toastr.success('Account created successfully', 'Welcome!');
                        });
                })
                .catch(function (error) {
                    /*
                    vm.signUpError = true;
                    vm.signUpErrorText = error.data.error;
                    */
                    toastr.error(error.data.error, 'Error');
                });
        }
    }
}
