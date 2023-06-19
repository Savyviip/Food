// const { Recipe, Diet } = require("../db");

// const getRecipeById = async (req, res) => {
//     const { id } = req.params;

//     try { 
//         const IdRecipe = id.toUpperCase();
//         const recipe = await Recipe.findOne({
//             where: { id: IdRecipe },
//             include: Diet,
//         });  
//         if (recipe) return res.status(200).json(recipe);
//         else return res.status(400).send("Recipe inexistente");

//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // const getRecipeById = async (id) => await recipe.findAll({ where: { id: id } });

// module.exports = getRecipeById;

// //* estamos importando recipe del modulo "db" donde ahi lo que estamos haciendo la relacion. estmaos buscanod una recipe por su ID.