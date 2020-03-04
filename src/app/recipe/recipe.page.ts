import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model'

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
recipes: Recipe[] = [
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

  ngOnInit() {
  }

}
