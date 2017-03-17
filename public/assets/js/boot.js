head.load(
    { file: 'vendor/jquery.js' },
    { file: 'vendor/angular.js' },
    { file: 'vendor/angular-messages.js' },
    { file: 'vendor/angular-route.js' },
    { file: 'vendor/angular-animate.js' },
    { file: 'vendor/angular-touch.js' },
    { file: 'vendor/angular-cookies.js' },
    { file: 'vendor/angular-sanitize.min.js' },
    { file: 'vendor/ui-grid.min.js' },
    { file: 'vendor/bootstrap.js' },
    { file: 'vendor/ui-bootstrap-tpls-1.3.3.js' },

    //Common data module upload
    { file: 'src/testApp/common/Common.js' },
    { file: 'src/testApp/common/config/RouteConfig.js' },
    { file: 'src/testApp/common/services/ContextOptionsService.js' },
    { file: 'src/testApp/common/services/AuthenticationFactory.js' },
    { file: 'src/testApp/common/services/BackendSrv.js' },

    //testApp module upload
    { file: 'src/testApp/main/Main.js' },
    { file: 'src/testApp/main/controllers/MainCtrl.js' },

    //testApp root module upload
    { file: 'src/testApp/login/Login.js'},
    { file: 'src/testApp/login/directives/LoginCtrl.js'},

    //testApp root module upload
    { file: 'src/testApp/TestApp.js' }
);