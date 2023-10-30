var Producto = require('./models/producto');

// Obtener todos los productos
exports.getProductos = async function (req, res) {
  try {
    const productos = await Producto.find({});
    res.json(productos);
  } catch (err) {
    res.send(err);
  }
}

// Agregar un nuevo producto a la base de datos
exports.addProducto = async function (req, res) {
  try {
    const producto = await Producto.create({
      codigo: req.body.codigo,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.stock,
      categoria: req.body.categoria,
      marca: req.body.marca,
      modelo: req.body.modelo
    });
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.send(err);
  }
}

// Actualizar un producto en la base de datos
exports.updateProducto = function (req, res) {
  Producto.updateOne({ _id: req.params.producto_id },
    {
      $set: {
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        categoria: req.body.categoria,
        marca: req.body.marca,
        modelo: req.body.modelo
      }
    })
    .then(function () {
      return Producto.find();
    })
    .then(function (productos) {
      res.json(productos);
    })
    .catch(function (err) {
      res.send(err);
    });
}

// Eliminar un producto de la base de datos
exports.removeProducto = function (req, res) {
  Producto.deleteOne({ _id: req.params.producto_id })
    .then(function () {
      return Producto.find();
    })
    .then(function (productos) {
      res.json(productos);
    })
    .catch(function (err) {
      res.send(err);
    });
}

const Usuario = require('./models/usuario');

exports.validarUsuario = async function (req, res) {
  const { correo, contraseña } = req.body;

  try {
      const usuario = await Usuario.findOne({ correo });

      if (!usuario) {
          return res.status(400).json({ mensaje: 'Correo de usuario o contraseña incorrecto.' });
      }

      const contraseñaValida = usuario.contraseña === contraseña;

      if (!contraseñaValida) {
          return res.status(400).json({ mensaje: 'Correo de usuario o contraseña incorrecto.' });
      }

      // Redirigir a crud.html y pasar el correo como parámetro en la URL
      return res.redirect('/crud.html?bienvenido=true&correo=' + correo);
  } catch (err) {
      res.status(500).json({ mensaje: 'Error en la validación de usuario.' });
  }
}




exports.registrarUsuario = (req, res) => {
    const { nombre, correo, password, edad } = req.body;

    const nuevoUsuario = new Usuario({
        nombre: nombre,
        correo: correo,
        password: password,
        edad: edad
    });

    nuevoUsuario.save()
        .then(() => {
            // Registro exitoso, redirige a donde desees
            res.redirect('/inicio'); 
        })
        .catch(err => {
            res.send('Error al registrar el usuario: ' + err);
        });
};

