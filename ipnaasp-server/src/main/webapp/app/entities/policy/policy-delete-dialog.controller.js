(function() {
    'use strict';

    angular
        .module('ipnaaspApp')
        .controller('PolicyDeleteController',PolicyDeleteController);

    PolicyDeleteController.$inject = ['$uibModalInstance', 'entity', 'Policy'];

    function PolicyDeleteController($uibModalInstance, entity, Policy) {
        var vm = this;

        vm.policy = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Policy.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
