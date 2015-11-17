(function () {
    'use strict';

    angular
        .module('jogApp')
        .factory('authentication', authentication);

    authentication.$inject = ['$rootScope', '$auth', '$http', 'urls', '$state', 'toastr'];

    function authentication($rootScope, $auth, $http, urls, $state, toastr) {
        var authentication = this;
        authentication.getUserUrl = urls.BASE_API + '/authenticate/user';

        authentication.currentUser = null;
        authentication.authenticated = false;

        authentication.getUser = function () {
            return $http.get(authentication.getUserUrl);
        };

        authentication.login = function (credentials) {
            var promise = $auth.login(credentials)
                .then(function () {
                    authentication.getUser()
                        .then(function (response) {
                            // Stringify the returned data to prepare it to go into local storage
                            var user = JSON.stringify(response.data.user);

                            localStorage.setItem('user', user);

                            authentication.authenticated = true;

                            authentication.currentUser = response.data.user;
                        });
                });

            return promise;
        };

        authentication.logout = function () {
            var promise = $auth.logout()
                .then(function () {
                    // Remove the authenticated user from local storage
                    localStorage.removeItem('user');

                    // Flip authenticated to false so that we no longer show UI elements dependant on the user being logged in
                    authentication.authenticated = false;

                    // Remove the current user info from $rootScope
                    authentication.currentUser = null;
                });
            return promise;
        };

        authentication.signUp = function ($userData) {
            var promise = $auth.signup($userData)
                .then(function (response) {
                    //We set the token to make login automatically
                    $auth.setToken(response);

                    authentication.getUser()
                        .then(function (response) {
                            // Stringify the returned data to prepare it
                            // to go into local storage
                            var user = JSON.stringify(response.data.user);

                            // Set the stringified user data into local storage
                            localStorage.setItem('user', user);

                            // The user's authenticated state gets flipped to
                            // true so we can now show parts of the UI that rely
                            // on the user being logged in
                            authentication.authenticated = true;

                            // Putting the user's data on $rootScope allows
                            // us to access it anywhere across the app
                            authentication.currentUser = response.data.user;
                        });
                });

            return promise;
        };

        authentication.stateChange = function (event) {
            // $stateChangeStart is fired whenever the state changes
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                var user = JSON.parse(localStorage.getItem('user'));

                // If there is any user data in local storage then the user is quite likely authenticated. If their token is expired, or if they are otherwise not actually authenticated, they will be redirected to the auth state because of the rejected request anyway
                if (user) {
                    // The user's authenticated state gets flipped to true so we can now show parts of the UI that rely on the user being logged in
                    authentication.authenticated = true;
                    authentication.currentUser = user;

                    // If the user is logged in and we hit the auth route we don't need to stay there and can send the user to the main state
                    if (toState.name === "signin" || toState.name === "signup") {
                        // Preventing the default behavior allows us to use $state.go to change states
                        event.preventDefault();
                        // go to the "main" state which in our case is '/'
                        $state.go('/');
                    }
                }

                /* Require Login */
                var requireLogin = toState.data.requireLogin;
                if (requireLogin && typeof authentication.currentUser === 'undefined') {
                    event.preventDefault();
                    // go to the "main" state which in our case is '/'
                    $state.go('/');
                } else { //If some user logged:
                    /* Only Admin Users */
                    var onlyAdmin = toState.data.onlyAdmin;
                    if (onlyAdmin && authentication.currentUser.role && authentication.currentUser.role === 'user') { //If the user has a different role than admin redirect to '/'
                        event.preventDefault();
                        // go to the "main" state which in our case is '/'
                        $state.go('access-denied');
                    }
                }
            });

        };

        return {

            login: function (credentials) {
                return authentication.login(credentials);
            },

            logout: function () {
                return authentication.logout();
            },

            signUp: function (userDate) {
                return authentication.signUp(userDate);
            },

            stateChange: function (event) {
                return authentication.stateChange(event);
            },

            currentUser: function () {
                return authentication.currentUser;
            },

            authenticated: function () {
                return authentication.authenticated;
            },

            setAuthenticated: function($authenticated){
                authentication.authenticated = $authenticated;
            },

            setCurrentUser: function($currentUser){
                authentication.curr = $currentUser;
            }
        }
    }
})();