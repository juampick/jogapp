(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('TimeEntryReportController', TimeEntryReportController);

    TimeEntryReportController.$inject = ['$scope', '$filter', '$timeout', 'authentication', 'report', 'user'];

    function TimeEntryReportController($scope, $filter, $timeout, authentication, reportService, userService) {
        var vm = this;

        //Auth
        vm.authenticated = authentication.authenticated();
        vm.currentUser = authentication.currentUser();
        $scope.$watch( authentication.authenticated, function ( authenticated ) {
            vm.authenticated = authenticated;
            vm.currentUser = authentication.currentUser();
        });

        vm.userSelected = vm.currentUser;

        vm.usersList = [];
        vm.reportList = [];
        // Pagination //
        vm.currentPage = 1;
        vm.itemsPerPage = 5;

        vm.labels = [];
        vm.optionsDistance = {
            scaleLabel: "<%=value%> Km",
            responsive: true,
        };
        vm.optionsSpeed = {
            scaleLabel: "<%=value%> Km/h",
            responsive: true
        };

        vm.seriesAvgSpeed = ['Average Speed'];
        vm.seriesAvgDistance = ['Average Distance'];

        vm.getReports = function (selectedUserId) {
            var user_id = vm.currentUser.id;
            if (selectedUserId !== undefined){
                user_id = selectedUserId;
            }
            vm.reportList = [];
            vm.totalItems = 0;
            vm.labels = [];
            vm.dataForChartSpeed = [];
            vm.dataForChartDistance = [];
            vm.labelsNew = [];

            reportService.get(user_id)
                .then(function (response) {
                    angular.forEach(response.data.results, function(value, key){
                        var year = $filter('limitTo')(key, 4, 0);
                        var week = $filter('limitTo')(key, 2, 4);
                        var label = year + '-' + week;
                        vm.labelsNew.push(label);
                        vm.dataForChartSpeed.push($filter('number')(value.avgSpeedSums, 2));
                        vm.dataForChartDistance.push($filter('number')(value.avgDistance, 2));
                        vm.reportList.push({
                            weekYear: key,
                            avgDistance: value.avgDistance,
                            avgSpeedSums: value.avgSpeedSums,
                        });
                    });

                    vm.totalItems = vm.reportList.length;

                    $timeout(function() {
                        vm.dataAvgSpeed = [ vm.dataForChartSpeed ];
                        vm.dataAvgDistance = [ vm.dataForChartDistance ];
                        vm.labels = vm.labelsNew;

                    });
                })
                .catch(function (data) {

                })
        };
        vm.getReports();

        function getUsers() {
            userService.get()
                .then(function (response) {
                    vm.usersList = [];
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
                vm.getReports(vm.userSelected.id);
            } else {
                vm.userSelected = vm.currentUser;
                vm.getReports();
            }
        };

    }

})();