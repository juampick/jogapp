angular
    .module('jogApp')
    .factory('timeEntry', timeEntry);

function timeEntry($resource) {

    var TimeEntry = $resource('api/v1/time_entry/:id', {}, {
        update: {
            method: 'PUT'
        }
    });

    return {
        get: function () {
            return TimeEntry.query().$promise;
        },

        save: function (data) {
            return TimeEntry.save(data).$promise;
        },

        update: function (data) {
            return TimeEntry.update({id: data.id}, data).$promise;
        },

        delete: function (id) {
            return TimeEntry.delete({id: id}).$promise;
        }
    }
}
