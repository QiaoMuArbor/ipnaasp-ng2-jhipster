(function() {
    'use strict';

    angular
        .module('ipnaaspApp')
        .controller('RecordingController', RecordingController);

    RecordingController.$inject = ['$scope', '$state', 'Recording'];

    function RecordingController ($scope, $state, Recording) {
        var vm = this;
        
        vm.recordings = [];

        loadAll();

        function loadAll() {
            Recording.query(function(result) {
                vm.recordings = result;
            });
        }
    }
})();
