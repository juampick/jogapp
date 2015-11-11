(function () {
    'use strict';

    angular
        .module('jogApp')
        .filter('dateToISO', function () {
            return function (input) {
                return new Date(input).toISOString();
            };
        });
})();