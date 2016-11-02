(function() {
    'use strict';
    angular
        .module('ipnaaspApp')
        .factory('Policy', Policy);

    Policy.$inject = ['$resource', 'DateUtils'];

    function Policy ($resource, DateUtils) {
        var resourceUrl =  'api/policies/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.createTime = DateUtils.convertDateTimeFromServer(data.createTime);
                        data.entryTime = DateUtils.convertDateTimeFromServer(data.entryTime);
                        data.exitTime = DateUtils.convertDateTimeFromServer(data.exitTime);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
