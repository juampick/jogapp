(function () {
    'use strict';

    angular
        .module('jogApp')
        .filter("dateFilter", function () {
            return function (items, from, to) {
                var result = [];
                for (var i = 0; i < items.length; i++) {
                    if (moment(items[i].date, 'YYYY-MM-DD').isBetween(moment(from, 'MM-DD-YYYY'), moment(to, 'MM-DD-YYYY'))){
                        result.push(items[i]);
                    }
                }
                return result;
            };
        });

})();