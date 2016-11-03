(function() {
    'use strict';
    angular
        .module('ipnaaspApp')
        .factory('Recording', Recording);

    Recording.$inject = ['$resource', 'DateUtils'];

    function Recording ($resource, DateUtils) {
        var resourceUrl =  'api/recordings/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.recordingTime = DateUtils.convertDateTimeFromServer(data.recordingTime);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
