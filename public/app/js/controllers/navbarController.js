(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'authentication'];
    function NavbarController($scope, authentication) {
        var vm = this;
        vm.authenticated = authentication.authenticated();
        vm.currentUser = authentication.currentUser();
        vm.logout = authentication.logout;

        $scope.$watch( authentication.authenticated, function ( authenticated ) {
            vm.authenticated = authenticated;
            vm.currentUser = authentication.currentUser();
        });
    }
})();