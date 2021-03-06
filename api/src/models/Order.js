const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    estado: {
      type: DataTypes.ENUM,
      values:['carrito', 'procesando','enviada','cancelada', 'completada'],
      allowNull: false
    }

  });
};
