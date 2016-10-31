AuthInterceptor.$inject = ['$rootScope', '$q', '$location'/*, '$localStorage', '$sessionStorage'*/];

export function AuthInterceptor ($rootScope, $q, $location/*, $localStorage, $sessionStorage*/) {
    var service = {
        request: request
    };

    return service;

    function request (config) {
        /*jshint camelcase: false */
        config.headers = config.headers || {};
        var token /*= $localStorage.authenticationToken || $sessionStorage.authenticationToken*/;
        
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        
        return config;
    }
}
