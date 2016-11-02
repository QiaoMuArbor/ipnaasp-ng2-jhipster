'use strict';

describe('Controller Tests', function() {

    describe('Policy Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockPolicy, MockUser, MockTeam, MockRecording;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockPolicy = jasmine.createSpy('MockPolicy');
            MockUser = jasmine.createSpy('MockUser');
            MockTeam = jasmine.createSpy('MockTeam');
            MockRecording = jasmine.createSpy('MockRecording');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Policy': MockPolicy,
                'User': MockUser,
                'Team': MockTeam,
                'Recording': MockRecording
            };
            createController = function() {
                $injector.get('$controller')("PolicyDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'ipnaaspApp:policyUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
