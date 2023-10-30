var Controlador = require('./controlador');
var mainDir = '';

module.exports = {
    principal: function (app) {
        // Obtener todos los productos
        app.get("/api/productos", Controlador.getProductos);

        // Crear un nuevo producto
        app.post('/api/producto', Controlador.addProducto);

        // Modificar los datos de un producto
        app.put('/api/producto/:producto_id', Controlador.updateProducto);

        // Borrar un producto
        app.delete('/api/producto/:producto_id', Controlador.removeProducto);

        // Ruta para cargar la página de registro
        app.get('/registro', function (req, res) {
            res.sendFile(mainDir + '/angular/registro.html');
        });

        // Ruta para manejar el registro de usuarios
        app.post('/registro', Controlador.registrarUsuario);

        // Ruta para cargar la página principal (puede ser la página de inicio)
        app.get('*', function (req, res) {
            res.sendFile(mainDir + '/angular/login.html');
        });

        // Ruta para manejar la validacion de usuarios
        app.post('/Login', Controlador.validarUsuario);
    },
    iniciar: function (main) {
        mainDir = main;
    }
};
