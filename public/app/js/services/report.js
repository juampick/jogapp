(function () {
    'use strict';

    angular
        .module('jogApp')
        .factory('report', report);

    report.$inject = ['$http', 'urls'];

    function report($http, urls) {

        var report = this;

        report.reportUrl = urls.BASE_API + '/report/';

        return {
            get: function (id) {
                return $http.get(report.reportUrl + id);
            }
        }
    }
})();