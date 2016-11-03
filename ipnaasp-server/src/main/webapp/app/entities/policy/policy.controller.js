(function() {
    'use strict';

    angular
        .module('ipnaaspApp')
        .controller('PolicyController', PolicyController);

    PolicyController.$inject = ['$scope', '$state', 'Policy'];

    function PolicyController ($scope, $state, Policy) {
        var vm = this;
        
        vm.policies = [];

        loadAll();

        function loadAll() {
            Policy.query(function(result) {
                vm.policies = result;
            });
        }
    }
})();
