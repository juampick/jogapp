(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('TimeEntryEditController', TimeEntryEditController);

    TimeEntryEditController.$inject = ['$scope', '$filter', '$state', 'authentication', 'timeEntry', 'toastr', '$stateParams'];

    function TimeEntryEditController($scope, $filter, $state, authentication, timeEntryService, toastr, $stateParams) {
        var vm = this;

        vm.originalTimeEntry = {};
        vm.timeEntry = {};
        vm.userSelected = {};

        if ($stateParams.userSelected !== null) {
            vm.userSelected = $stateParams.userSelected;
        }

        console.debug(vm.userSelected);

        if ($stateParams.data !== undefined){
            var editTimeEntry = $stateParams.data;

            vm.originalTimeEntry = {
                id: editTimeEntry.id,
                date: $filter('date')(editTimeEntry.date, "MM-dd-yyyy"),
                distance: Number(editTimeEntry.distance),
                time: editTimeEntry.time
            };

            console.debug(vm.originalTimeEntry);
            vm.timeEntry = {
                id: editTimeEntry.id,
                date: $filter('date')(editTimeEntry.date, "MM-dd-yyyy"),
                distance: Number(editTimeEntry.distance),
                time: editTimeEntry.time
            };

        } else {
            //ToDo: search for data from db?
        }

        /* Form: DatePicker config: */
        vm.timeEntry.date = new Date(vm.timeEntry.date);
        vm.dateFormat = 'MM-dd-yyyy';
        vm.datePickerStatus = {
            opened: false
        };
        vm.openDatePicker = function ($event) {
            vm.datePickerStatus.opened = true;
        };

        vm.update = function(isValid){
            if (isValid){
                vm.timeEntry.date = $filter('date')(vm.timeEntry.date, 'MM-dd-yyyy'); //Convert to compare
                if (!angular.equals(vm.originalTimeEntry, vm.timeEntry)){

                    vm.timeEntryToSend = {};
                    vm.timeEntryToSend = vm.timeEntry;
                    //vm.timeEntryToSend.user_id = authentication.currentUser().id; //ToDo: check this

                    vm.timeEntryToSend.date = moment(vm.timeEntryToSend.date, 'MM-DD-YYYY').format('YYYY-MM-DD');

                    timeEntryService.update(vm.timeEntryToSend)
                        .then(function(){
                            toastr.success('Log updated successfully');
                            toastr.clear();
                            $state.go('log_list', { userSelected: vm.userSelected});
                        })
                        .catch(function(data){

                        });
                } else {
                    $state.go('log_list');
                }

            }
        }
    }
})();