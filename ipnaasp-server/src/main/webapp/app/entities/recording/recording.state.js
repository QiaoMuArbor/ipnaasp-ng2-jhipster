(function() {
    'use strict';

    angular
        .module('ipnaaspApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('recording', {
            parent: 'entity',
            url: '/recording',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Recordings'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/recording/recordings.html',
                    controller: 'RecordingController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('recording-detail', {
            parent: 'entity',
            url: '/recording/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Recording'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/recording/recording-detail.html',
                    controller: 'RecordingDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Recording', function($stateParams, Recording) {
                    return Recording.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'recording',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('recording-detail.edit', {
            parent: 'recording-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/recording/recording-dialog.html',
                    controller: 'RecordingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Recording', function(Recording) {
                            return Recording.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('recording.new', {
            parent: 'recording',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/recording/recording-dialog.html',
                    controller: 'RecordingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                type: null,
                                content: null,
                                time: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('recording', null, { reload: 'recording' });
                }, function() {
                    $state.go('recording');
                });
            }]
        })
        .state('recording.edit', {
            parent: 'recording',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/recording/recording-dialog.html',
                    controller: 'RecordingDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Recording', function(Recording) {
                            return Recording.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('recording', null, { reload: 'recording' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('recording.delete', {
            parent: 'recording',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/recording/recording-delete-dialog.html',
                    controller: 'RecordingDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Recording', function(Recording) {
                            return Recording.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('recording', null, { reload: 'recording' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
