angular.module('TestApp.Main')
    .controller('MainCtrl', function ($scope, ContextService, backendSrv, $timeout, $location) {
        $scope.logOut = function () {
            $location.path('/login');
        };

        $scope.addRow = {};
        $scope.addRow.firstName = '';
        $scope.addRow.lastName = '';
        $scope.addRow.position = '';
        $scope.required = true;

        $scope.gridOptions = {
            enableSorting: true,
            enableSelectAll: false,
            columnDefs: [
                { field: 'firstName' },
                { field: 'lastName' },
                { field: 'position'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.grid1Api = gridApi;

            }
        };


        function init() {

            backendSrv.getDashboard({
                user: ContextService.user.name
            }).then(function (result) {
                $scope.gridOptions.data = result;

            })
        }

        init();

        $scope.deleteSelected = function(){
            angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {
                $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
            });
        };

        $scope.gridOptions.onRegisterApi = function(gridApi){
            $scope.gridApi = gridApi;
        };

        $scope.addRowToTable = function (data) {
            $scope.gridOptions.data.push({
                firstName:data.firstName,
                lastName:data.lastName,
            position:data.position
            })
        }
        $scope.filterRowToTable = function (data) {
            $timeout(function () {
                getFileredData(data)
            },1000)
        };

        function getFileredData(data) {
            backendSrv.getDashboard({
                filter:data
            }).then(function (result) {
                $scope.gridOptions.data = result;
            })
        };



    });