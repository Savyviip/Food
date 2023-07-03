// Llamo a todos las recipes y tambien por nombre

// const { Diet, Recipe } = require('../db');
// const axios = require('axios');
// const { KEY_API, URL_API } = process.env;
// const { Op } = require('sequelize');

// //* Controller function para crear una nueva receta / POST
// const createRecipe = async (title, image, summary, healthScore, analyzedInstructions, diets) => {
//   // Crear una nueva receta en la base de datos
//   const newRecipe = await Recipe.create({ title, image, summary, healthScore, analyzedInstructions });
//   // Encontrar o crear instancias de los tipos de dietas asociados con la receta
//   const dietInstances = await Promise.all(diets.map(diet => Diet.findOrCreate({ where: { diet } })));
//   //Asociar los tipos de dietas con la receta
//   // console.log(dietInstances.map(diet => [0].id))
//   // await newRecipe.addDiet(1);
//   await newRecipe.setDiets(dietInstances.map(diet => diet[0].id));

//   //Obtener los tipos de dietas asociados con la receta
//   const recipeDiets = await newRecipe.getDiets();
//   // Devolver un objeto que contenga la informacion de la receta y los tipos de dietas
//   const result = [newRecipe, recipeDiets];
//   return result;
// };

// //* Funcion de utilidad para limpiar los datos de la receta
// const cleanArray = (arr) => {
//   return arr.map((elem) => {
//     const diets = elem.diets ? elem.diets.map((diet) => {
//       if (typeof diet === "string") {
//         return diet;
//       } else {
//         return diet.diet;
//       }
//     }) : [];

//     return {
//       id: elem.id,
//       title: elem.title,
//       image: elem.image,
//       diets: diets,
//       summary: elem.summary,
//       healthScore: elem.healthScore,
//       // analyzedInstructions: elem.analyzedInstruction.map(e => e.name),
//     };
//   });
// };

// //* Funcion para buscar recetas por titulo
// const getRecipeByTitle = async (title) => {
//   const foodArray = [];
//   // Buscar recetas en la base de datos que coincidan con el titulo
//   const dbRecipesRaw = await Recipe.findAll({
//     where: {
//       title: {
//         [Op.iLike]: `%${title}%`
//       }
//     },
//     limit: 15
//   });
//   //* Buscar recetas en la API externa que coincidan con el título
//   const apiRecipesRaw = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d60d4c78ba98402f984ab766d3563cb8&number=100&query=${title}&addRecipeInformation=true`)).data.results;


//   // Limpiar los datos de las recetas obtenidas
//   const apiRecipes = cleanArray(apiRecipesRaw);
//   const dbRecipes = cleanArray(dbRecipesRaw);

//   // Combinar los resultados de la base de datos y la API
//   const result = [...dbRecipes, ...apiRecipes];
//   // const result = [...dbRecipesRaw, ...foodArray];

//   if (result.length === 0) {
//     // Devolver un mensaje de error si no se encontraron recetas
//     return { message: `There's no available recipes for your query: '${title}'.` };
//   }

//   return result;
// };

// //* Obtener todas las recetas de la API externa
// const getAllRecipes = async () => {
  
//   const apiRecipesRaw = (await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)).data.results;
//   // Obtener todas las recetas de la base de datos, incluyendo los tipos de dietas asociados
//   const dbRecipesRaw = await Recipe.findAll({
//     includes: [{
//       model: Diet,
//       attributes: ['diet'],
//     }],
//   });

//   // // Limpiar los datos de las recetas obtenidas
//   // const dbRecipes = cleanArray(dbRecipesRaw);
//   const apiRecipes = cleanArray(apiRecipesRaw);

//   // Combinar los resultados de la base de datos y la API
//   return [...apiRecipes];
  
// };



// //* Función para obtener una receta por ID de la base de datos o la API externa
// const getRecipeById = async (id, source) => {
//   let response;
//   var foodForId = [];
//   if (source === "api") {
//     // Obtener la receta de la API externa
//     response = (await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)).data;
//     // Extraemos la informacion de api recorriendo los objetos que necesitamos.
//     response.results.forEach(e => {
//       if (e.id == id) {
//         foodForId.push({
//           id: e.id,
//           title: e.title,
//           image: e.image,
//           summary: e.summary,
//           healthScore: e.healthScore,
//           diets: e.diets,
//           analyzedInstructions: e.analyzedInstructions[0]?.steps.map(e => {
//             return e.step
//           }),
//         })
//       }
//     });
//     console.log(foodForId)

//   } else {
//     // Obtener la receta de la base de datos incluyendo los tipos de dietas asociados
//     response = await Recipe.findByPk(id, {
//       include: [{
//         model: Diet,
//         attributes: ['id', 'diet'],
//       }],
//     }).then(recipe => {
//       if (!recipe) {
//         throw new Error('UUID valid but Recipe not found');
//       }

//       // Obtener los nombres de los tipos de dietas
//       const diets = recipe.diets.map(elem => (elem.diet));

//       // Extraer la información relevante de la receta
//       const { id, title, image, summary, healthScore, analyzedInstructions } = recipe;

//       return { id, title, image, summary, healthScore, diets, analyzedInstructions };
//     });
//   }
//   if (source === "api") {
//     // Obtener los datos de la receta de la respuesta de la API externa
//     // const { id, title, image, summary, healthScore, diets, analyzedInstructions } = response.data;
//     return foodForId;
//   } else {
//     // Devolver la respuesta obtenida de la base de datos
//     return foodForId;
//   }
//   console.log(source)
// };

// //* Función para eliminar una receta por su ID
// const deleteRecipeById = async (id) => {
//   // Eliminar la receta de la base de datos utilizando el ID
//   const deletedRecipeCount = await Recipe.destroy({
//     where: {
//       id: id
//     }
//   });

//   //* Devolver la cantidad de recetas eliminadas
//   return deletedRecipeCount;
// };

// module.exports = {
//   createRecipe,
//   getRecipeById,
//   getRecipeByTitle,
//   getAllRecipes,
//   deleteRecipeById,
// };









    // let response;
    // var foodForName = [];
    // if (source === "api") {
    //   // Obtener la receta de la API externa
    //   response = (await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)).data;
    //   // Extraemos la informacion de api recorriendo los objetos que necesitamos.
    //   response.results.forEach(e => {
    //     if (e.title == title) {
    //       foodForName.push({
    //         id: e.id,
    //         title: e.title,
    //         image: e.image,
    //         summary: e.summary,
    //         healthScore: e.healthScore,
    //         diets: e.diets,
    //         analyzedInstructions: e.analyzedInstructions[0]?.steps.map(e => {
    //           return e.step
    //         }),
    //       })
    //     }
    //   });


    // const response = (await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)).data;

  // response.results.filter(e => {
  //   if (e.title.toLowerCase().includes(title.toLowerCase())) {
  //     console.log(e.title)
  //     foodArray.push({
  //       id: e.id,
  //       title: e.title,
  //       image: e.image,
  //       summary: e.summary,
  //       healthScore: e.healthScore,
  //       diets: e.diets,
  //       analyzedInstructions: e.analyzedInstructions[0]?.steps.map(e => {
  //         return e.step
  //       }),
  //     })
  //   }
  // });
  // return foodArray;
  // }






  const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db.js');
const axios = require ('axios');
const { KEY, URL } = process.env;

// Controller function para crear una nueva receta
const createRecipe = async (title, image, summary, healthScore, analyzedInstructions, diets) => {
  // Crear una nueva receta en la base de datos
  const newRecipe = await Recipe.create({ title, image, summary, healthScore, analyzedInstructions });

  // Encontrar o crear instancias de los tipos de dietas asociados con la receta
  const dietInstances = await Promise.all(diets.map(diet => Diet.findOrCreate({ where: { diet } })));

  // Asociar los tipos de dietas con la receta
  await newRecipe.setDiets(dietInstances.map(diet => diet[0].id));

  // Obtener los tipos de dietas asociados con la receta
  const recipeDiets = await newRecipe.getDiets();

  // Devolver un objeto que contenga la información de la receta y los tipos de dietas
  const result = [newRecipe, recipeDiets];
  return result;
};

// Función de utilidad para limpiar los datos de la receta
const cleanArray = (arr) => {
  return arr.map((elem) => {
    const diets = elem.diets ? elem.diets.map((diet) => {
      if (typeof diet === 'string') {
        return diet;
      } else {
        return diet.diet;
      }
    }) : [];

    return {
      id: elem.id,
      title: elem.title,
      image: elem.image,
      diets: diets,
      healthScore: elem.healthScore
    };
  });
};

// Función para buscar recetas por título
const getRecipeByTitle = async (title) => {
  // Buscar recetas en la base de datos que coincidan con el título
  const dbRecipesRaw = await Recipe.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`
      }
    },
    limit: 15
  });

  // Buscar recetas en la API externa que coincidan con el título
  const apiRecipesRaw = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d60d4c78ba98402f984ab766d3563cb8&number=100&query=${title}&addRecipeInformation=true`))

  // Limpiar los datos de las recetas obtenidas
  const apiRecipes = cleanArray(apiRecipesRaw);
  const dbRecipes = cleanArray(dbRecipesRaw);

  // Combinar los resultados de la base de datos y la API
  const result = [...dbRecipes, ...apiRecipes];

  if (result.length === 0) {
    // Devolver un mensaje de error si no se encontraron recetas
    return { message: `There's no available recipes for your query: '${title}'.` };
  }

  return result;
};

const getAllRecipes = async () => {
  // Obtener todas las recetas de la API externa
  const apiRecipesRaw = (await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)).data.results;

  // Obtener todas las recetas de la base de datos, incluyendo los tipos de dietas asociados
  const dbRecipesRaw = await Recipe.findAll({
    include: [{
      model: Diet,
      attributes: ['id', 'diet'],
    }],
  });

  // Limpiar los datos de las recetas obtenidas
  const dbRecipes = cleanArray(dbRecipesRaw);
  const apiRecipes = cleanArray(apiRecipesRaw);

  // Combinar los resultados de la base de datos y la API
  return [...dbRecipes, ...apiRecipes];
};

// Función para obtener una receta por ID de la base de datos o la API externa
const getRecipeById = async (id, source) => {
  let response;

  if (source === "api") {
    // Obtener la receta de la API externa
    response = (await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)).data;
  } else {
    // Obtener la receta de la base de datos incluyendo los tipos de dietas asociados
    response = await Recipe.findByPk(id, {
      include: [{
        model: Diet,
        attributes: ['id', 'diet'],
      }],
    }).then(recipe => {
      if (!recipe) {
        throw new Error('UUID valid but Recipe not found');
      }

      // Obtener los nombres de los tipos de dietas
      const diets = recipe.diets.map(elem => (elem.diet));

      // Extraer la información relevante de la receta
      const { id, title, image, summary, healthScore, analyzedInstructions } = recipe;

      return { id, title, image, summary, healthScore, diets, analyzedInstructions };
    });
  }

  if (source === "api") {
    // Obtener los datos de la receta de la respuesta de la API externa
    const { id, title, image, summary, healthScore, diets, analyzedInstructions } = response.data;
    return { id, title, image, summary, healthScore, diets, analyzedInstructions };
  } else {
    // Devolver la respuesta obtenida de la base de datos
    return response;
  }
};

// Función para eliminar una receta por su ID
const deleteRecipeById = async (id) => {
  // Eliminar la receta de la base de datos utilizando el ID
  const deletedRecipeCount = await Recipe.destroy({
    where: {
      id: id
    }
  });

  // Devolver la cantidad de recetas eliminadas
  return deletedRecipeCount;
};

module.exports = {
  createRecipe,
  getRecipeById,
  getRecipeByTitle,
  getAllRecipes,
  deleteRecipeById
};