(function() {
    'use strict';

    angular
        .module('ipnaaspApp')
        .controller('PolicyDialogController', PolicyDialogController);

    PolicyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Policy', 'User', 'Team', 'Recording'];

    function PolicyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Policy, User, Team, Recording) {
        var vm = this;

        vm.policy = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.users = User.query();
        vm.teams = Team.query();
        vm.recordings = Recording.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.policy.id !== null) {
                Policy.update(vm.policy, onSaveSuccess, onSaveError);
            } else {
                Policy.save(vm.policy, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('ipnaaspApp:policyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.createTime = false;
        vm.datePickerOpenStatus.entryTime = false;
        vm.datePickerOpenStatus.exitTime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
