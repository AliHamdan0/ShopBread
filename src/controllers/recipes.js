const Recipes = require('../models/recipes');
const asyncHandler = require('express-async-handler');

// get all recipes
// GET /recipes
// private
const getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipes.find();
  res.status(200).json({ recipes });
});

module.exports = {
  getAllRecipes,
};
