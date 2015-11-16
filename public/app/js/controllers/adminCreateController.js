(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('AdminCreateController', AdminCreateController);

    AdminCreateController.$inject = ['$scope', '$state', 'filterFilter', 'timeEntry', 'toastr', 'authentication', 'user'];

    function AdminCreateController($scope, $state, filterFilter, timeEntryService, toastr, authentication, userService) {
        var vm = this;
        vm.user = {};

        //newUser function
        vm.new = function (isValid) {
            if (isValid) {
                userService.save(vm.user)
                    .then(function(){
                        $state.go('admin');
                        toastr.success('User created successfully');
                    })
                    .catch(function(error){
                        toastr.error(error.data.error, 'Error');
                    });
            }
        };

    }
})();