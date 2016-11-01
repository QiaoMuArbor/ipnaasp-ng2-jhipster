(function() {
    'use strict';

    angular
        .module('ipnaaspApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('policy', {
            parent: 'entity',
            url: '/policy',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Policies'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/policy/policies.html',
                    controller: 'PolicyController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('policy-detail', {
            parent: 'entity',
            url: '/policy/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Policy'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/policy/policy-detail.html',
                    controller: 'PolicyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Policy', function($stateParams, Policy) {
                    return Policy.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'policy',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('policy-detail.edit', {
            parent: 'policy-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/policy/policy-dialog.html',
                    controller: 'PolicyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Policy', function(Policy) {
                            return Policy.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('policy.new', {
            parent: 'policy',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/policy/policy-dialog.html',
                    controller: 'PolicyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                type: null,
                                direction: false,
                                status: null,
                                createTime: null,
                                entryTime: null,
                                exitTime: null,
                                entryPoint: null,
                                exitPoint: null,
                                reason: null,
                                push: false,
                                realEntryPoint: null,
                                realExitPoint: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('policy', null, { reload: 'policy' });
                }, function() {
                    $state.go('policy');
                });
            }]
        })
        .state('policy.edit', {
            parent: 'policy',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/policy/policy-dialog.html',
                    controller: 'PolicyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Policy', function(Policy) {
                            return Policy.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('policy', null, { reload: 'policy' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('policy.delete', {
            parent: 'policy',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/policy/policy-delete-dialog.html',
                    controller: 'PolicyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Policy', function(Policy) {
                            return Policy.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('policy', null, { reload: 'policy' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
