angular.module('TestApp.Common')
    .service('ContextService', function ($rootScope, backendSrv, $cookieStore) {
        var ctx = this;
        ctx.user = $cookieStore.get('user');
        ctx.token = '';
        function activateContext() {
            if (ctx.user) {
                backendSrv.post('/getContextConfig', {login: ctx.user.login}).then(function (data) {
                    ctx.user = data.user;
                    $cookieStore.put('user', ctx.user);
                });
            }
        }
        activateContext();
    });