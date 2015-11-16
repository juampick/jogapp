(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('TimeEntryCreateController', TimeEntryCreateController);

    TimeEntryCreateController.$inject = ['$scope', '$filter', '$state', 'authentication', 'timeEntry', 'toastr', 'user'];

    function TimeEntryCreateController($scope, $filter, $state, authentication, timeEntry, toastr, userService) {
        var vm = this;

        vm.timeEntry = {};
        vm.usersList = [];
        vm.userSelected = {};

        //Auth
        vm.authenticated = authentication.authenticated();
        vm.currentUser = authentication.currentUser();
        $scope.$watch( authentication.authenticated, function ( authenticated ) {
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
                vm.timeEntryToSend = vm.timeEntry;
                vm.timeEntryToSend.user_id = authentication.currentUser().id;
                vm.timeEntryToSend.date = $filter('date')(vm.timeEntry.date, 'yyyy-MM-dd');

                timeEntry.save(vm.timeEntryToSend)
                    .then(function () {
                        toastr.success('Log save successfully');
                        toastr.clear();
                        $state.go('log_list');
                    })
                    .catch(function(error){
                        toastr.success('There was an error saving your Log');
                        toastr.clear();
                        $state.go('log_list');
                    });
            }
        };

        function getUsers() {
            userService.get()
                .then(function (response) {
                    /*vm.users = [];
                     angular.forEach(response, function (item) {
                     var timeInHours = moment.duration(item.time, "HH:mm:ss: A").asHours();
                     item.averageSpeed = (item.distance / timeInHours);
                     vm.timeEntries.push(item);
                     });*/
                    vm.usersList = response;
                })
                .catch(function () {

                })
                .finally(function () {
                    /*toastr.clear();
                     vm.totalItems = vm.timeEntries.length;
                     console.log('@getTimeEntries totalItems: ' + vm.totalItems);*/
                });
        }
        if (vm.currentUser.role !== 'user') {
            getUsers();
        }

        vm.changeUserSelect = function(){
            console.debug(vm.userSelected);
            if (vm.userSelected !== null){
                getTimeEntries(vm.userSelected.id);
            } else {
                vm.timeEntries = [];
                vm.totalItems = 0;
            }
        };
    }

})();