import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { functions } from 'lodash';
import { compress } from 'csso';

if(module.hot) {
  module.hot.accept();
}
const controlRecipes = async () => {
try{

  const id = window.location.hash.slice(1);
  if(!id) return;
  recipeView.renderSpinner();
  await model.loadRecipe(id);
  recipeView.render(model.state.recipe);

}catch (err) {
  console.log(err);
  recipeView.renderError();
}  };


 const controlSearchResults = async function() {
   try {
    
    const query = searchView.getQuery();
    if(!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query); 
    console.log(model.state.search.results)
    resultsView.render(model.getSearchResultsPage(1))

    //Render Pagination
    paginationView.render(model.state.search)

   }catch(err){
     console.log(err)
   }
 } 

 const controlPagination = function(goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage))
  paginationView.render(model.state.search)
  console.log('Pag controller')
 }
 
 const controlServings = function (newServings) {
  model.updateServings(newServings)
  recipeView.render(model.state.recipe)
  };


const init = () => {
recipeView.addHandlerRender(controlRecipes);
recipeView.addHandlerUpdateServings(controlServings)
searchView.addHandlerSearch(controlSearchResults)
paginationView.addHandlerClick(controlPagination)

};


init();
