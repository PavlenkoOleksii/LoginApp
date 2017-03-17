var app = angular.module('TestApp.Common', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/test'
        })
        .when('/login', {
            templateUrl: 'src/testApp/login/templates/login.html',
            controller: 'LoginCtrl'
        })
        .when('/test', {
            templateUrl: '/src/testApp/main/templates/main.html',
            controller: 'MainCtrl',
            reloadOnSearch: false,
        })
        .otherwise({
            template: "<h1>Sorry!</h1><p>Page Under construction</p>"
        });
}]);


app.run(['$rootScope', '$location', '$cookieStore', '$http', 'ContextService',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        var token = $cookieStore.get('token');
        if (token) {
            $http.defaults.headers.common = {'x-access-token': token};
        }

        $rootScope.$on('$locationChangeStart', function () {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var token = $cookieStore.get('token');
            if (restrictedPage && !token) {
                $location.path('/login');
            }
        });
    }]);