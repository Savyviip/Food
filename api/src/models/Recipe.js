const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID, // alfanumerico universal
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {  // validamos que el nombre tiene que ser entre 2 a 15 caracteres
        len: {
          args: [2, 15],
          msg: "El nombre debe contener 5 y 10 caracteres"
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // resumen del plato
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // FLOAT numeros decimales
    healthScore: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    //PASO A PASO - almacena estructuras de datos json.
    analyzedInstructions: {
      type: DataTypes.JSONB
    },
  });
};
