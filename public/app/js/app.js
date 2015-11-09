angular
    .module('jogApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'satellizer', 'toastr', 'ngMessages', 'angular-loading-bar', 'ngAnimate'])
    .constant('urls', {
        BASE_API: '/api/v1'
    })
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', '$httpProvider', '$provide', config])
    .run(['$rootScope', '$state', run]);

function config($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, $httpProvider, $provide, urls) {

    function redirectWhenLoggedOut($q, $injector) {
        return {
            responseError: function(rejection) {
                // Need to use $injector.get to bring in $state or else we get a circular dependency error
                var $state = $injector.get('$state');

                // Instead of checking for a status code of 400 which might be used for other reasons in Laravel, we check for the specific rejection reasons to tell us if we need to redirect to the login state
                var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                // Loop through each rejection reason and redirect to the login state if one is encountered
                angular.forEach(rejectionReasons, function(value, key) {
                    if(rejection.data.error === value) {
                        // If we get a rejection corresponding to one of the reasons in our array, we know we need to authenticate the user so we can remove the current user from local storage
                        localStorage.removeItem('user');
                        // Send the user to the auth state so they can login
                        $state.go('signin');
                    }
                });

                return $q.reject(rejection);
            }
        }
    }
    // Setup for the $httpInterceptor
    $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
    // Push the new factory onto the $http interceptor array
    $httpProvider.interceptors.push('redirectWhenLoggedOut');
    // Satellizer config:
    $authProvider.loginUrl = '/api/v1/authenticate';
    $authProvider.signupUrl = '/api/v1/authenticate/signup';

    //// Redirect to the auth state if any other states
    //// are requested other than users

    // Set default
    $urlRouterProvider.otherwise('/');

    // Remove # from url
    $locationProvider.html5Mode(true);

    $stateProvider
        // route for the home page
        .state('/', {
            url: '/',
            templateUrl: 'app/pages/home.html',
            controller: 'HomeController as home',
            data: {
                requireLogin: false
            }
        })
        .state('signin', {
            url: '/signin',
            templateUrl: 'app/pages/signin.html',
            controller: 'AuthController as auth',
            data: {
                requireLogin: false
            }
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'app/pages/signup.html',
            controller: 'AuthController as auth',
            data: {
                requireLogin: false
            }
        })
        .state('dashboard', {
            url         : '/dashboard',
            templateUrl : 'app/pages/dashboard.html',
            controller  : 'HomeController as home',
            data: {
                requireLogin: true
            }
        })
        .state('access-denied', {
            url         : '/access_denied',
            templateUrl : 'app/pages/access_denied.html',
            data: {
                requireLogin: false,
                onlyAdmin: false
            }
        })
        .state('admin', {
            url         : '/admin',
            templateUrl : 'app/pages/admin.html',
            controller  : 'HomeController as home',
            data: {
                requireLogin: true,
                onlyAdmin: true
            }
        });
}

function run ($rootScope, $state) {
    // $stateChangeStart is fired whenever the state changes. We can use some parameters
    // such as toState to hook into details about the state as it is changing
    $rootScope.$on('$stateChangeStart', function (event, toState) {

        // Grab the user from local storage and parse it to an object
        var user = JSON.parse(localStorage.getItem('user'));

        // If there is any user data in local storage then the user is quite
        // likely authenticated. If their token is expired, or if they are
        // otherwise not actually authenticated, they will be redirected to
        // the auth state because of the rejected request anyway
        if (user) {
            // The user's authenticated state gets flipped to true so we can now show parts of the UI that rely on the user being logged in
            $rootScope.authenticated = true;
            // Putting the user's data on $rootScope allows us to access it anywhere across the app. Here we are grabbing what is in local storage
            $rootScope.currentUser = user;
            // If the user is logged in and we hit the auth route we don't need to stay there and can send the user to the main state
            if (toState.name === "signin" || toState.name ==="signup") {
                // Preventing the default behavior allows us to use $state.go to change states
                event.preventDefault();
                // go to the "main" state which in our case is '/'
                $state.go('/');
            }
        }

        /* Require Login */
        var requireLogin = toState.data.requireLogin;
        if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
            event.preventDefault();
            // go to the "main" state which in our case is '/'
            $state.go('/');
        } else { //If some user logged:
            /* Only Admin Users */
            var onlyAdmin = toState.data.onlyAdmin;
            if (onlyAdmin && $rootScope.currentUser.role && $rootScope.currentUser.role !== 'admin'){ //If the user has a different role than admin redirect to '/'
                event.preventDefault();
                // go to the "main" state which in our case is '/'
                $state.go('access-denied');
            }
        }

    });
}