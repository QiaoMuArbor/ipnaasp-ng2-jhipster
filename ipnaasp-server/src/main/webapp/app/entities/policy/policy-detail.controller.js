(function() {
    'use strict';

    angular
        .module('ipnaaspApp')
        .controller('PolicyDetailController', PolicyDetailController);

    PolicyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Policy', 'User', 'Team', 'Recording'];

    function PolicyDetailController($scope, $rootScope, $stateParams, previousState, entity, Policy, User, Team, Recording) {
        var vm = this;

        vm.policy = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('ipnaaspApp:policyUpdate', function(event, result) {
            vm.policy = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
