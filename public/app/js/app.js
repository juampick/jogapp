(function () {
    'use strict';

    angular
        .module('jogApp', ['ui.router', 'ngResource', 'ui.bootstrap', 'satellizer', 'toastr', 'ngMessages', 'angular-loading-bar', 'ngAnimate', 'ui.mask', 'chart.js'])
        .constant('urls', {
            BASE_API: '/api/v1'
        })
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', '$httpProvider', '$provide', 'urls', config])
        .run(['$rootScope', 'authentication', 'toastr', run]);

    //.constant('USER_ROLES', {
    //    all: '*',
    //    admin: 'admin',
    //    user: 'user',
    //    guest: 'guest'
    //})

    function config($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, $httpProvider, $provide, urls) {

        function redirectWhenLoggedOut($q, $injector, $rootScope) {
            return {
                responseError: function (rejection) {
                    // Need to use $injector.get to bring in $state or else we get a circular dependency error
                    var $state = $injector.get('$state');

                    // Instead of checking for a status code of 400 which might be used for other reasons in Laravel, we check for the specific rejection reasons to tell us if we need to redirect to the login state
                    var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                    // Loop through each rejection reason and redirect to the login state if one is encountered
                    angular.forEach(rejectionReasons, function (value, key) {
                        if (rejection.data.error === value) {
                            // If we get a rejection corresponding to one of the reasons in our array, we know we need to authenticate the user so we can remove the current user from local storage
                            localStorage.removeItem('user');
                            // Send the user to the auth state so they can login
                            $state.go('signin');

                            $rootScope.$emit('loggedOut');
                        }
                    });

                    return $q.reject(rejection);
                }
            }
        }

        //Setup for the $httpInterceptor
        $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
        // Push the new factory onto the $http interceptor array
        $httpProvider.interceptors.push('redirectWhenLoggedOut');

        // Satellizer config: //
        $authProvider.loginUrl = urls.BASE_API + '/authenticate';
        $authProvider.signupUrl = urls.BASE_API + '/authenticate/signup';

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
                url: '/dashboard',
                templateUrl: 'app/pages/dashboard.html',
                controller: 'HomeController as home',
                data: {
                    requireLogin: true
                }
            })
            .state('access-denied', {
                url: '/access_denied',
                templateUrl: 'app/pages/access_denied.html',
                data: {
                    requireLogin: false,
                    onlyAdmin: false
                }
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'app/pages/admin.html',
                controller: 'HomeController as home',
                data: {
                    requireLogin: true,
                    onlyAdmin: true
                }
            })
            .state('log_list', {
                url: '/log_list',
                templateUrl: 'app/pages/log_list.html',
                controller: 'TimeEntryListController as timeList',
                data: {
                    requireLogin: true
                }
            })
            .state('log_create', {
                url: '/log_create',
                templateUrl: 'app/pages/log_create.html',
                controller: 'TimeEntryCreateController as timeCreate',
                data: {
                    requireLogin: true
                }
            })
            .state('log_edit', {
                params: {data: {}},
                url: '/log_edit/:id',
                templateUrl: 'app/pages/log_edit.html',
                controller: 'TimeEntryEditController as timeEdit',
                data: {
                    requireLogin: true
                }
            })
            .state('log_report', {
                url: '/log_report',
                templateUrl: 'app/pages/log_report.html',
                controller: 'TimeEntryReportController as timeReport',
                data: {
                    requireLogin: true
                }
            });

    }

    function run($rootScope, authentication, toastr) {
        authentication.stateChange(event);

        $rootScope.$on('loggedOut', function(event) {
            toastr.error('You are not allowed to see this. Please Sign-in again');

            authentication.setAuthenticated(false);
            authentication.setCurrentUser(null);
        });
    }
})();