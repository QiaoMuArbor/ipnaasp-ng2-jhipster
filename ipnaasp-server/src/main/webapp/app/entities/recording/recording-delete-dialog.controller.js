(function() {
    'use strict';

    angular
        .module('ipnaaspApp')
        .controller('RecordingDeleteController',RecordingDeleteController);

    RecordingDeleteController.$inject = ['$uibModalInstance', 'entity', 'Recording'];

    function RecordingDeleteController($uibModalInstance, entity, Recording) {
        var vm = this;

        vm.recording = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Recording.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
