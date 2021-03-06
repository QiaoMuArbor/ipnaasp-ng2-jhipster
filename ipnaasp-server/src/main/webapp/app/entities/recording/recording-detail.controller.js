(function() {
    'use strict';

    angular
        .module('ipnaaspApp')
        .controller('RecordingDetailController', RecordingDetailController);

    RecordingDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Recording', 'User', 'Policy'];

    function RecordingDetailController($scope, $rootScope, $stateParams, previousState, entity, Recording, User, Policy) {
        var vm = this;

        vm.recording = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('ipnaaspApp:recordingUpdate', function(event, result) {
            vm.recording = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
