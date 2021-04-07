import * as model from './model.js';
import recipeView from './views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////

const controlRecipes = async () => {

  const id = `5ed6604591c37cdc054bc886`;
  //  const id = window.location.hash.slice(1);

  if(!id) return;
  
  recipeView.renderSpinner();
  
  await model.loadRecipe(id);
  recipeView.render(model.state.recipe);

     
  };

const init = () => {
recipeView.addHandlerRender(controlRecipes);
};


init();