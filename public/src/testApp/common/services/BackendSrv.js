angular.module('TestApp.Common')
    .service('backendSrv', function ($http, $location) {
        var self = this;
        self.getDashboard = getDashboard;
        self.post = post;

        function post(url, data) {
            return request({method: 'POST', url: url, data: data});
        }

        function getDashboard(data) {
            return post('/dashboard', data);
        }

        function request(options) {
            return $http(options)
                .then(function (results) {
                    return results.data;
                })
                .catch(function (error) {
                    if (error.status == 401 || error.status == 403) {
                        $location.path('/login')
                    } else {
                        throw error;
                    }
                })
        }
    });