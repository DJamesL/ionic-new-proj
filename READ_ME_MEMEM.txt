- delete home folder
(Create a component from scratch"
- issue command "ionic generate"
-- select page
-- add new name "recipe"
(creates a recipe in routing, new component name recipe)

- delete home routing in app-routing.modules.ts

[from this]
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
];

[to this]
const routes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  {
    path: 'recipe',
    loadChildren: () => import('./recipe/recipe.module').then( m => m.RecipePageModule)
  },
];

- update recipes.page.html as desired
<ion-header>
  <ion-toolbar>
    <ion-title>Recipe</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <p>Recipes page works!</p>
</ion-content>

- ADD RECIPE.MODEL.TS FILE
-- declaring some type of data structure(angular daw)

- EDIT RECIPE.PAGES.TS
-- import Recipe data struct
-- add new items of type recipes
--- parang initialization of new recipe variables (default value)

- UPDATE RECIPE.PAGE.HTML
<ion-list>
    <ion-item *ngFor = "let recipe of recipes">
      <ion-avatar slot="start">
        <ion-img [src] = "recipe.imageUrl"></ion-img>
      </ion-avatar>
      <ion-label>{{ recipe.title }}</ion-label>
    </ion-item>
  </ion-list>

- ADD NEW RECIPE-DETAIL COmponent (see up) (use path)
-- ionic generate page recipe/recipe-detail
- MODIFY routing (children <- an array of route definitions)

[from this]
const routes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  {
    path: 'recipe',
    loadChildren: () => import('./recipe/recipe.module').then( m => m.RecipePageModule)
  },
  {
    path: 'recipe-detail',
    loadChildren: () => import('./recipe/recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule)
  },
];

[to this]
const routes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  {
    path: 'recipe',
    children: [
      {
        path: "",
        loadChildren: () => import('./recipe/recipe.module').then( m => m.RecipePageModule)
      },
      {
        path: ":recipeId",
        loadChildren: () => import('./recipe/recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule)
      },     
    ]
  }
];