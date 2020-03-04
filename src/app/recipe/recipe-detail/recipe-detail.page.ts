import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;
  constructor(
    private activaterouted:ActivatedRoute, 
    private recipesService: RecipeService
    ) { }

  ngOnInit() {
    this.activaterouted.paramMap.subscribe(paramMap =>{
      if(!paramMap.has('recipeId')){ //error checking
        //redirect the user here
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipesService.getRecipe(recipeId);
    });

  }

}
