import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipePage } from './recipe.page';

const routes: Routes = [
  {
    path: '',
    component: RecipePage
  },
  {
    path: 'recipe-detail',
    loadChildren: () => import('./recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipePageRoutingModule {}
