const { Router } = require('express');
const { getAllRecipes } = require('../controllers/recipes');
const validateToken = require('../middlewares/validateTokenHandler');

const recipesRouter = Router();
recipesRouter.use(validateToken);

recipesRouter.get('/recipes', getAllRecipes);

// recipesRouter.post('/recipes/:id', getRecipeById);

module.exports = recipesRouter;
