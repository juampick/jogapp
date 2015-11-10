angular
    .module('jogApp')
    .controller('TimeEntryController', TimeEntryController);

angular.module('jogApp').filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

function TimeEntryController($scope, $filter, $log, timeEntry){
    vm = this;

    vm.timeEntries = [];

    vm.dateTimeFormat = 'MM-dd-yyyy HH:mm:ss';
    vm.dateFormat = 'MM-D-YY';
    // Date filter //
    vm.dateFrom = moment().format(vm.dateFormat);
    vm.dateTo = moment().format(vm.dateFormat);

    vm.currentPage = 1;
    vm.itemsPerPage = 3;

    //vm.setPage = function (pageNo) {
    //    vm.currentPage = pageNo;
    //};

    //vm.pageChanged = function() { //ToDo: remove?
    //    $log.log('Page changed to: ' + vm.currentPage);
    //};

    function getTimeEntries(){
        //self.toasts.get = self.loading('Loading notes...');
            timeEntry.get()
                .then(function(response) {
                    angular.forEach(response, function(item){
                        var timeInHours = moment.duration(item.time, "HH:mm:ss: A").asHours();
                        item.averageSpeed = (item.distance / timeInHours);
                        vm.timeEntries.push( item );
                    });
                })
                .catch(function(){

                })
                .finally(function(){
                    //ngToast.dismiss(self.toasts.get);

                    vm.totalItems = vm.timeEntries.length;
                });
        }
    //}

     getTimeEntries();


}