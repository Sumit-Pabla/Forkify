import * as model from './model.js';
import {MODAL_CLOSE_SEC} from './config'
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView'



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
  resultsView.update(model.getSearchResultsPage());
  bookmarksView.update(model.state.bookmarks)


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
 }
 
 const controlServings = function (newServings) {
  model.updateServings(newServings)
  //recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)

  };

const controlAddBookmark = function() {
  //add or remove bookmarks
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //update recipeView
  recipeView.update(model.state.recipe)

  //Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe) {
  try {

addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe)

    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    setTimeout(function() {
      addRecipeView.toggleWindow()}, MODAL_CLOSE_SEC * 1000
    );
  }catch(err){
    console.error('!!!!!', err);
    addRecipeView.renderError(err.message);
  }
}
const init = () => {
bookmarksView.addHandlerRender(controlBookmarks)
recipeView.addHandlerRender(controlRecipes);
recipeView.addHandlerUpdateServings(controlServings)
recipeView.addHandlerAddBookmark(controlAddBookmark)
searchView.addHandlerSearch(controlSearchResults)
addRecipeView.addHandlerUpload(controlAddRecipe)
paginationView.addHandlerClick(controlPagination)

};


init();
