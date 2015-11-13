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

        if ($stateParams.data !== undefined){
            var editTimeEntry = $stateParams.data;

            vm.originalTimeEntry = {
                id: editTimeEntry.id,
                date: editTimeEntry.date,
                distance: editTimeEntry.distance,
                time: editTimeEntry.time
            };
            console.log(editTimeEntry);
            vm.timeEntry = {
                id: editTimeEntry.id,
                date: editTimeEntry.date,
                distance: editTimeEntry.distance,
                time: editTimeEntry.time
            };


            console.log(vm.timeEntry);
        }

        /* Form: DatePicker config: */
        //vm.timeEntry.date = new Date();
        vm.dateFormat = 'MM-dd-yyyy';
        vm.datePickerStatus = {
            opened: false
        };
        vm.openDatePicker = function ($event) {
            vm.datePickerStatus.opened = true;
        };

        //vm.dateFrom = moment().format(vm.dateFormat);
        vm.timeEntry.date = new Date(vm.timeEntry.date);

        vm.update = function(isValid){
            if (isValid){
                if (!angular.equals(vm.originalTimeEntry, vm.timeEntry)){

                    console.debug('objects are not equal.. UPDATE: ');
                    console.debug('original: ');
                    console.debug(vm.originalTimeEntry);
                    console.debug('new: ');
                    console.debug(vm.timeEntry);

                    timeEntryService.update(vm.timeEntry)
                        .then(function(){

                        })
                        .catch(function(data){

                        })
                        .finally(function(){
                            toastr.success('Log updated successfully');
                            toastr.clear();
                            $state.go('log_list');
                        });
                }


            }
        }
    }
})();