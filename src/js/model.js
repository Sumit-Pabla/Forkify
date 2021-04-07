import { async } from 'regenerator-runtime'

export const state = {
    recipe: {},
};

    
    export const loadRecipe = async function (id){     
            
            await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`).then(response => {
              response.json().then(data => {
                const {recipe} = data.data
                state.recipe = {
                  id: recipe.id,
                  title: recipe.title,
                  publisher: recipe.publisher,
                  sourceUrl: recipe.source_url,
                  image: recipe.image_url,
                  servings: recipe.servings,
                  cookingTime: recipe.cooking_time,
                  ingredients: recipe.ingredients
                }})
            }).catch(err => {
              console.error(err);
            })
            console.log(state.recipe)
    }