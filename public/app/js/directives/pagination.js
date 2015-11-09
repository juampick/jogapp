angular
    .module('jogApp')
    .filter('pagination', function () {
        return function (input, start) {
            start = +start;
            return input.slice(start);
        };
    });