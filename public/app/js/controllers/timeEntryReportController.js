(function () {
    'use strict';

    angular
        .module('jogApp')
        .controller('TimeEntryReportController', TimeEntryReportController);

    TimeEntryReportController.$inject = ['$scope', '$filter', 'authentication', 'report'];

    function TimeEntryReportController($scope, $filter, authentication, reportService) {
        var vm = this;

        vm.reportList = [];
        vm.dataForChartSpeed = [];
        vm.dataForChartDistance = [];

        vm.labels = [];

        vm.seriesAvgSpeed = ['Average Speed'];
        vm.dataAvgSpeed = [ vm.dataForChartSpeed ];

        vm.seriesAvgDistance = ['Average Distance'];
        vm.dataAvgDistance = [ vm.dataForChartDistance ];

        //vm.onClick = function (points, evt) {
        //    console.log(points, evt);
        //};


        vm.getReports = function () {
            reportService.get(authentication.currentUser().id)
                .then(function (response) {
                    vm.reportList = response.data;
                    angular.forEach(vm.reportList.results, function(value, key){
                        vm.labels.push(key);
                        vm.dataForChartSpeed.push($filter('number')(value.avgSpeedSums, 2));
                        vm.dataForChartDistance.push(value.avgDistance);
                    });
                })
                .catch(function (data) {

                })
        };
        vm.getReports();


    }

})();