(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('TimeEntryListController', TimeEntryListController);

    TimeEntryListController.$inject = ['$scope', '$state', '$filter', '$stateParams', 'filterFilter', 'timeEntry', 'toastr', 'authentication', 'user'];

    function TimeEntryListController($scope, $state, $filter, $stateParams, filterFilter, timeEntryService, toastr, authentication, userService) {
        var vm = this;

        //Auth
        vm.authenticated = authentication.authenticated();
        vm.currentUser = authentication.currentUser();
        $scope.$watch(authentication.authenticated, function (authenticated) {
            vm.authenticated = authenticated;
            vm.currentUser = authentication.currentUser();
        });

        vm.timeEntries = [];
        vm.timeEntriesOriginal = [];
        vm.usersList = [];
        vm.userSelected = {};
        vm.userSelectedParam = null;

        if ($stateParams.userSelected !== null) {
            vm.userSelected = $stateParams.userSelected;
            vm.userSelectedParam = vm.userSelected;
        } else {
            vm.userSelected = vm.currentUser;
        }

        vm.search= {
            dateFrom: '',
            dateTo: ''
        }; //Search object

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
        //vm.dateFormat = 'MM-dd-yyyy';

        // Pagination //
        vm.currentPage = 1;
        vm.itemsPerPage = 6;

        vm.resetFilters = function () {
            vm.search.dateFrom = '';
            vm.search.dateTo = '';
            vm.updateSearch();
        };

        vm.updateSearch = function () {
            //vm.filtered = filterFilter(vm.timeEntries, {distance: vm.search.distance}); //ToDo: take off this if not distance searched
            //vm.totalItems = vm.filtered.length;

            vm.timeEntries = vm.timeEntriesOriginal;
            vm.totalItems = vm.timeEntries.length;

            console.log('@updateSearch - totalItems: ' + vm.totalItems);
        };

        vm.search = function(){
            vm.search.dateFrom = $filter('date')(vm.search.dateFrom, "MM-dd-yyyy");
            vm.search.dateTo = $filter('date')(vm.search.dateTo, "MM-dd-yyyy");

            if (vm.search.dateFrom !== '' && vm.search.dateTo !== '') {
                vm.newTimesEntriesList = $filter('dateFilter')(vm.timeEntriesOriginal, vm.search.dateFrom, vm.search.dateTo);
                vm.timeEntries = [];
                vm.timeEntries = vm.newTimesEntriesList;
                vm.totalItems = vm.timeEntries.length;
            }
        };

        function getTimeEntries(selectedUserId) {
            if (selectedUserId === undefined) {
                if (vm.userSelectedParam !== null){
                    selectedUserId = vm.userSelectedParam.id;
                }
            }
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
                    vm.timeEntriesOriginal = vm.timeEntries;
                });
        }

        vm.deleteTimeEntry = function (timeEntry) {
            toastr.info('Deleting Log..');
            timeEntryService.delete(timeEntry.id)
                .then(function () {
                    toastr.success('Log has been deleted successfully');
                })
                .catch(function (error) {
                    toastr.error('There was en error deleting the TimeEntry', error.data.error);
                })
                .finally(function () {
                    getTimeEntries();
                    //updateSearch(); ???
                    toastr.clear();
                });
        };

        vm.editTimeEntry = function (timeEntry) {
            $state.go('log_edit',
                {
                    id: timeEntry.id,
                    data: timeEntry,
                    userSelected: vm.userSelected
                });
        };

        getTimeEntries();

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

        vm.changeUserSelect = function () {
            if (vm.userSelected !== null) {
                getTimeEntries(vm.userSelected.id);
            } else {
                vm.userSelected = vm.currentUser;
                getTimeEntries();
            }
        };

        vm.refresh = function () {
            getTimeEntries();
        };

    }
})();