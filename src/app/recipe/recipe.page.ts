import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/recipe/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  recipes: Recipe[];
  constructor(private recipesService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipesService.getAllRecipes();
  }

}
