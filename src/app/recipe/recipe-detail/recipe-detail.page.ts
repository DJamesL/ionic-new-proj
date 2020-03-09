import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from '../recipe.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe;
  constructor(
    private activaterouted:ActivatedRoute, 
    private recipesService: RecipeService,
    private router: Router,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    this.activaterouted.paramMap.subscribe(paramMap =>{
      if(!paramMap.has('recipeId')){ //error checking
        //redirect the user here
        this.router.navigate(['/recipe']);
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.loadedRecipe = this.recipesService.getRecipe(recipeId);
    });
    console.log("OnInit - Detail");
  }

  ionViewWillEnter(){
    console.log("will enter - Detail");
  }

  ionViewDidEnter(){
    console.log("Did enter - Detail");
  }

  ionViewWillLeave(){
    console.log("will Leave - Detail");
  }

  ionViewDidLeave(){
    console.log("Did Leave - Detail");
  }

  ngOnDestroy(){
    console.log("OnDestroy - Detail");
  }

  onDeleteRecipe(){this.alertCtrl
    .create({
      header: 'Are you sure?',
      message: 'Do you really want to delete the recipe?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            console.log(this.loadedRecipe.id);
            this.recipesService.deleteRecipe(this.loadedRecipe.id);
            this.router.navigate(['/recipe']);
          }
        }
      ]
    })
    .then(alertEl => {
      alertEl.present();
    });
  }
}
