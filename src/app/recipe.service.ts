import { Injectable } from '@angular/core';

import { Recipe } from 'src/app/recipe/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Dings Bagoong',
      imageUrl: 'D:\JAMES\Personal\Source_Codes\ionic\test-app-start\images\image1.jpg',
      ingredients: ['Alamang', 'Ketchup', 'Mayumo']
    },
    {
      id: 'r2',
      title: 'Pizza',
      imageUrl: 'D:\JAMES\Personal\Source_Codes\ionic\test-app-start\images\image2.jpg',
      ingredients: ['Dough', 'Bell Pepper', 'Cheese']
    }
  
  ]

  constructor() { }

  getAllRecipes(){
    return [...this.recipes];
  }

  getRecipe(recipeId: string){
    return {
      ...this.recipes.find(recipe => {
      return recipe.id === recipeId;
    })
    };
  }

}
