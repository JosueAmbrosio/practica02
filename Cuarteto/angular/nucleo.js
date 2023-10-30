angular.module('MainApp', []);

function controladorPrincipal($scope, $http) {
    $scope.productos = {};
    $scope.newProducto = {};

    $http.get('/api/productos').success(function (data) {
        $scope.productos = data;
        console.log(data);
    }).error(function (data) {
        console.log('error:' + data);
    });

    $scope.registrarProducto = function () {
        $http.post('/api/producto', $scope.newProducto)
            .success(function (data) {
                $scope.newProducto = {};
                $scope.productos = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Seleccionar un producto de la tabla
    $scope.selectProducto = function (producto) {
        $scope.newProducto = producto;
        $scope.selected = true;
        console.log($scope.newProducto, $scope.selected);
    };

    // Editar un producto
    $scope.modificarProducto = function () {
        $http.put('/api/producto/' + $scope.newProducto._id, $scope.newProducto)
            .success(function (data) {
                $scope.newProducto = {};
                $scope.productos = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Eliminar un producto
    $scope.borrarProducto = function () {
        $http.delete('/api/producto/' + $scope.newProducto._id)
            .success(function (data) {
                $scope.newProducto = {};
                $scope.productos = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
}
