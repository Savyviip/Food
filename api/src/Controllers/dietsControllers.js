const axios = require('axios');
require('dotenv').config();
const { KEY_API, URL_API } = process.env;
const { Diet } = require('../db.js');

// Función para crear las dietas
const createDiets = async () => {
  // Obtener dietas de una API externa
  const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=9d382ee9e48a404dbfe5e535fbd77584&addRecipeInformation=true&number=40`);
  const data = response.data.results; // Obtener los resultados de la respuesta

  // Crear un Conjunto para evitar duplicados
  const uniqueDiets = new Set(); // Crear un conjunto vacío para almacenar las dietas únicas
  data.forEach((result) => {
    result.diets.forEach((diet) => {
      uniqueDiets.add(diet); // Agregar cada dieta al conjunto
    });
  });

  uniqueDiets.add('vegetarian'); // agrego la dieta vegetarian que piden en el readme

  // Ordenar e insertar dietas en la base de datos
  const sortedDiets = [...uniqueDiets].sort(); // Convertir el conjunto en un arreglo y ordenarlo alfabéticamente
  await Diet.bulkCreate(sortedDiets.map((diet) => ({ diet })), { ignoreDuplicates: true }); // Insertar las dietas en la base de datos, ignorando las duplicadas

  // Consultar dietas de la base de datos y devolverlas
  const diets = await Diet.findAll({
    attributes: ['id', 'diet'], // Obtener solo el atributo diet
    order: [['diet', 'ASC']] // Ordenar las dietas en orden ascendente
  });
  console.log(diets)
  return diets.map((diet) => diet.diet); // Extraer los nombres de las dietas en un nuevo arreglo y devolverlo
};

module.exports = createDiets; // Exportar la función createDiets como módulo, DIET HANDLERS EXPORT