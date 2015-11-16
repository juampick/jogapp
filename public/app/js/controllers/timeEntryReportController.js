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
        vm.optionsDistance = {
            scaleLabel: "<%=value%> Km",
            responsive: true,
        };
        vm.optionsSpeed = {
            scaleLabel: "<%=value%> Km/h",
            responsive: true
        };

        /*vm.colours = [{
            /!*fillColor: 'rgba(47, 132, 71, 0.8)',*!/
            /!*strokeColor: 'rgba(47, 132, 71, 0.8)',*!/
            /!*highlightFill: 'rgba(47, 132, 71, 0.8)',*!/
            /!*highlightStroke: 'rgba(47, 132, 71, 0.8)'*!/
            fillColor: '#DCDCDC',
            strokeColor: '#4D5360'
        }];*/

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
                        var year = $filter('limitTo')(key, 4, 0);
                        var week = $filter('limitTo')(key, 2, 4)
                        var label = year + '-' + week;
                        vm.labels.push(label);
                        vm.dataForChartSpeed.push($filter('number')(value.avgSpeedSums, 2));
                        vm.dataForChartDistance.push($filter('number')(value.avgDistance, 2));
                    });
                })
                .catch(function (data) {

                })
        };
        vm.getReports();


    }

})();