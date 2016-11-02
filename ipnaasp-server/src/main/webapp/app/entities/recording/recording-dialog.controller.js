(function() {
    'use strict';

    angular
        .module('ipnaaspApp')
        .controller('RecordingDialogController', RecordingDialogController);

    RecordingDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Recording', 'Policy'];

    function RecordingDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Recording, Policy) {
        var vm = this;

        vm.recording = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.policies = Policy.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.recording.id !== null) {
                Recording.update(vm.recording, onSaveSuccess, onSaveError);
            } else {
                Recording.save(vm.recording, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('ipnaaspApp:recordingUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.recordingTime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
