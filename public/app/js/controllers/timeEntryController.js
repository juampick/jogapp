angular
    .module('jogApp')
    .controller('TimeEntryController', TimeEntryController);

function TimeEntryController($scope, $filter, $log, filterFilter, timeEntry, toastr){
    vm = this;

    vm.timeEntries = [];
    vm.search = {}; //Search object

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

    /*vm.update = function()
    {
        vm.filtered = filterFilter(vm.timeEntries, {distance: vm.search.distance});
        vm.totalItems = vm.filtered.length;
        console.log('@update - totalItems: ' + vm.totalItems);
    };*/

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
            toastr.info('Loading records...');
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
                    toastr.clear();
                    vm.totalItems = vm.timeEntries.length;
                    console.log('@getTimeEntries totalItems: ' + vm.totalItems);
                });
        }
    //}

     getTimeEntries();
     //vm.update();
}