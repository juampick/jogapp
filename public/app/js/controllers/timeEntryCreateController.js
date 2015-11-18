(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('TimeEntryCreateController', TimeEntryCreateController);

    TimeEntryCreateController.$inject = ['$scope', '$filter', '$state', '$stateParams', 'authentication', 'timeEntry', 'toastr', 'user'];

    function TimeEntryCreateController($scope, $filter, $state, $stateParams, authentication, timeEntry, toastr, userService) {
        var vm = this;

        vm.timeEntry = {};
        vm.usersList = [];
        vm.userSelected = {};

        if ($stateParams.userSelected !== null) {
            vm.userSelected = $stateParams.userSelected;
        }

        //Auth
        vm.authenticated = authentication.authenticated();
        vm.currentUser = authentication.currentUser();
        $scope.$watch(authentication.authenticated, function (authenticated) {
            vm.authenticated = authenticated;
            vm.currentUser = authentication.currentUser();
        });

        /* Form: DatePicker config: */
        vm.timeEntry.date = new Date();
        vm.dateFormat = 'MM-dd-yyyy';
        vm.datePickerStatus = {
            opened: false
        };
        vm.openDatePicker = function ($event) {
            vm.datePickerStatus.opened = true;
        };

        vm.create = function (isValid) {
            if (isValid) {
                vm.timeEntryToSend = {};
                vm.timeEntryToSend = angular.copy(vm.timeEntry);
                vm.timeEntryToSend.user_id = vm.userSelected.id;
                vm.timeEntryToSend.date = $filter('date')(vm.timeEntry.date, 'yyyy-MM-dd');

                timeEntry.save(vm.timeEntryToSend)
                    .then(function () {
                        toastr.success('Log save successfully');
                        toastr.clear();
                        $state.go('log_list', { userSelected: vm.userSelected});
                    })
                    .catch(function (error) {
                        toastr.success('There was an error saving your Log');
                        toastr.clear();
                        $state.go('log_list', { userSelected: vm.userSelected});
                    });
            }
        };

        function getUsers() {
            userService.get()
                .then(function (response) {
                    vm.usersList = response;
                })
                .catch(function () {

                })
                .finally(function () {

                });
        }

        if (vm.currentUser.role !== 'user') {
            getUsers();
        }
    }

})();