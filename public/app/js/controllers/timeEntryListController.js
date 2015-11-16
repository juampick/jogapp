(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('TimeEntryListController', TimeEntryListController);

    TimeEntryListController.$inject = ['$scope', '$state', 'filterFilter', 'timeEntry', 'toastr', 'authentication', 'user'];

    function TimeEntryListController($scope, $state, filterFilter, timeEntryService, toastr, authentication, userService) {
        var vm = this;

        vm.timeEntries = [];
        vm.search = {}; //Search object

        //Auth
        vm.authenticated = authentication.authenticated();
        vm.currentUser = authentication.currentUser();

        // DatePicker //
        vm.datePickerFormat = 'MM-dd-yyyy';
        vm.statusDateFrom = {
            opened: false
        };
        vm.statusDateTo = {
            opened: false
        };
        vm.openDateFromPicker = function ($event) {
            vm.statusDateFrom.opened = true;
        };
        vm.openDateToPicker = function ($event) {
            vm.statusDateTo.opened = true;
        };
        // DatePicker //

        //vm.dateTimeFormat = 'MM-dd-yyyy HH:mm:ss';
        vm.dateTimeFormat = 'MM-dd-yyyy';
        vm.dateFormat = 'MM-D-YYYY';
        // Date filter //
        //vm.dateFrom = moment().format(vm.dateFormat);
        //vm.dateTo = moment().format(vm.dateFormat);

        // Pagination //
        vm.currentPage = 1;
        vm.itemsPerPage = 3;

        vm.resetFilters = function () {
            vm.search = {};
            vm.updateSearch();
        };

        vm.updateSearch = function () {
            console.log('updateSearch');
            vm.filtered = filterFilter(vm.timeEntries, {distance: vm.search.distance});
            vm.totalItems = vm.filtered.length;
            console.log('@updateSearch - totalItems: ' + vm.totalItems);

        };

        function getTimeEntries(selectedUserId) {
            toastr.info('Loading records...');
            timeEntryService.get(selectedUserId)
                .then(function (response) {
                    vm.timeEntries = [];
                    angular.forEach(response, function (item) {
                        var timeInHours = moment.duration(item.time, "HH:mm:ss: A").asHours();
                        item.averageSpeed = (item.distance / timeInHours);
                        vm.timeEntries.push(item);
                    });
                })
                .catch(function () {

                })
                .finally(function () {
                    toastr.clear();
                    vm.totalItems = vm.timeEntries.length;
                    console.log('@getTimeEntries totalItems: ' + vm.totalItems);
                });
        }

        vm.deleteTimeEntry = function (timeEntry) {
            toastr.info('Deleting Log..');
            timeEntryService.delete(timeEntry.id)
                .then(function(){
                    toastr.success('Log has been deleted successfully');
                })
                .catch(function(error){
                    toastr.error('There was en error deleting the TimeEntry', error.data.error);
                })
                .finally(function() {
                    getTimeEntries();
                    //updateSearch(); ???
                    toastr.clear();
                });
        };

        vm.editTimeEntry = function (timeEntry) {
            $state.go('log_edit',
                {
                    id: timeEntry.id,
                    data: timeEntry
                });
        };

        getTimeEntries();

        $scope.$watch( authentication.authenticated, function ( authenticated ) {
            vm.authenticated = authenticated;
            vm.currentUser = authentication.currentUser();
        });

        vm.usersList = [];
        vm.userSelected = {};

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
        getUsers();

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