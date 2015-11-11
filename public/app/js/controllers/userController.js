(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('UserController', UserController);

    function UserController($http, $auth, $rootScope, toastr) {
        var vm = this;

        // We would normally put the logout method in the same
        // spot as the login method, ideally extracted out into
        // a service. For this simpler example we'll leave it here
        //vm.logout = function () {
        //    $auth.logout().then(function () {
        //
        //        // Remove the authenticated user from local storage
        //        localStorage.removeItem('user');
        //
        //        // Flip authenticated to false so that we no longer
        //        // show UI elements dependant on the user being logged in
        //        $rootScope.authenticated = false;
        //
        //        // Remove the current user info from rootscope
        //        $rootScope.currentUser = null;
        //        toastr.success('Logout Successful', 'Goodbye!');
        //    });
        //}
    }
})();