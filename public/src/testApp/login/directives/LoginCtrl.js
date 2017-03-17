var app = angular.module('TestApp.Login');
angular.module('TestApp.Login')
    .controller('LoginCtrl', function ($scope, $rootScope, $location, AuthenticationService, ContextService, $cookieStore) {
        $scope.login = login;
        (function initController() {
            AuthenticationService.ClearCredentials();

        })();

        function login() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password).then(function (data) {
                if (data != "error") {
                    ContextService.user = data.user;
                    ContextService.token = data.token;
                    $cookieStore.put('user', ContextService.user);
                    $cookieStore.put('token', ContextService.token);
                    AuthenticationService.SetCredentials();
                    $location.path('/');
                } else {
                    $location.path('/login');
                    $scope.dataLoading = false;
                    $scope.err = true;
                }
            });
        }
    });