(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('TimeEntryCreateController', TimeEntryCreateController);

    TimeEntryCreateController.$inject = ['$scope', '$filter', '$state', 'authentication', 'timeEntry', 'toastr'];

    function TimeEntryCreateController($scope, $filter, $state, authentication, timeEntry, toastr) {
        var vm = this;

        vm.timeEntry = {};

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
                vm.userToSend = vm.timeEntry;
                vm.userToSend.user_id = authentication.currentUser().id;
                vm.userToSend.date = $filter('date')(vm.timeEntry.date, 'yyyy-MM-dd HH:mm:ss');

                timeEntry.save(vm.userToSend)
                    .then(function (response) {

                    })
                    .finally(function () {
                        toastr.success('Log save successfully');
                        toastr.clear();
                        $state.go('log_list');
                    });
            }
        }
    }

})();