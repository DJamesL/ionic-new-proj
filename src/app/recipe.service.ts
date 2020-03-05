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
      //imageUrl: 'file:///D:/JAMES/Personal/Source_Codes/ionic/test-app-start/images/image1.JPG',
      imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Schnitzel.JPG/1024px-Schnitzel.JPG',
      ingredients: ['Alamang', 'Ketchup', 'Mayumo']
    },
    {
      id: 'r2',
      title: 'Pizza',
      //imageUrl: 'file:///D:/JAMES/Personal/Source_Codes/ionic/test-app-start/images/image2.jpg',
      imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/1024px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
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
  
  deleteRecipe(recipeId: string){
    this.recipes.filter(recipe => {
      return recipe.id !== recipeId
    });
  }

}
