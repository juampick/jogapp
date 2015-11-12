(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('TimeEntryFormController', TimeEntryFormController);

    TimeEntryFormController.$inject = ['$scope', '$filter', '$state', 'authentication', 'timeEntry', 'toastr', '$stateParams'];

    function TimeEntryFormController($scope, $filter, $state, authentication, timeEntry, toastr, $stateParams) {
        var vm = this;

        vm.timeEntry = {};

        if ($stateParams.data !== undefined){
            vm.timeEntry = $stateParams.data;
        }

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
                //toastr.info('Creating log');
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