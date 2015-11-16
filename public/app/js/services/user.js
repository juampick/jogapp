(function () {
    'use strict';

    angular
        .module('jogApp')
        .factory('user', user);

    user.$inject = ['$resource', 'urls'];

    function user($resource, urls) {

        var User = $resource(urls.BASE_API + '/user/:id', {}, {
            update: {
                method: 'PUT'
            }
        });

        return {
            get: function () {
                return User.query().$promise;
            },

            save: function (data) {
                return User.save(data).$promise;
            },

            update: function (data) {
                return User.update({id: data.id}, data).$promise;
            },

            delete: function (id) {
                return User.delete({id: id}).$promise;
            }
        }
    }
})();