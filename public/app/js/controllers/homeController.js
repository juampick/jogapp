(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'authentication'];

    function HomeController($scope, authentication) {
        var vm = this;
        vm.title = 'Welcome';
        vm.subtitle = 'track your jogging';

        vm.authenticated = authentication.authenticated();
        vm.currentUser = authentication.currentUser();

        $scope.$watch( authentication.authenticated, function ( authenticated ) {
            vm.authenticated = authenticated;
            vm.currentUser = authentication.currentUser();
        });
    }
})();