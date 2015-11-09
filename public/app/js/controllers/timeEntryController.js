angular
    .module('jogApp')
    .controller('TimeEntryController', TimeEntryController);

function TimeEntryController($scope, $filter, timeEntry){
    vm = this;

    vm.timeEntries = [];

    vm.dateFormat = 'MM-dd-yyyy HH:mm:ss';

    // Current Page //
    vm.currentPage = 0;
    vm.pageSize = 3;

    vm.numberOfPages = function()
    {
        return Math.ceil(vm.timeEntries.length / vm.pageSize);
    };

    function getTimeEntries(){
        //self.toasts.get = self.loading('Loading notes...');
        //if (!$rootScope.expensesFetched){
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
                    //$rootScope.expensesFetched = true;
                });
        }
    //}

    getTimeEntries();

}