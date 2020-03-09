import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/recipe/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit, OnDestroy {
  recipes: Recipe[];
  constructor(private recipesService: RecipeService) { }

  ngOnInit() {
    console.log("ngOnInit")
  }

  ionViewWillEnter(){
    this.recipes = this.recipesService.getAllRecipes();
    console.log(this.recipes)
    console.log("will enter");
  }

  ionViewDidEnter(){
    console.log("Did enter");
  }

  ionViewWillLeave(){
    console.log("will Leave");
  }

  ionViewDidLeave(){
    console.log("Did Leave");
  }

  ngOnDestroy(){
    console.log("OnDestroy");
  }
}
