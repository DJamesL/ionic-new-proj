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

- ADD ANGULAR SERVICE
-- ionic generate service recipes

- Move the recipe data from recipe.page.ts to recipe.service.ts RecipeService
- Allow the moved recipe to be accessed by recipe.page.ts
-- import the recipes data struct from recipe.model.ts
-- can be done my creating methods (getter for all, getter for specific)
-- set recipes data to private 
-- blah blah blah on the primitive vs reference types
-- blah blah on the find method 

- access the newly created service on recipe.page.ts

- inject ActivatedRoute to recipe-detail.page (import mo n rin)
-- blah blah paramMap, observable
-- observables are objects to subcribe to, to get data(one time data, or multiple)
- inject recipes service

- access the loadedrecipe in the recipe-detail.page.html


- add an onclick listener for each ionic item
-- can also use a routerLink(angular command)
- add an ionic-back button
-- add a defaultback page, in case that the child page is loaded at startup

- add delete button
- add deleterecipe method in RecipeService
- add onclick method for button (onDeleteRecipe) 
- create method onDeleteRecipe
-- added routing; when a recipe is deleted, the page will be auto route to home

- add.import alert controller 
- configured alert controller, w/ meassage and stuffs

working together w/ angular components
- generate an ionic component
- copy item from page.html to component.html
- bindable add @
- must import on the module that will use it, e.g. recipe-module.ts
- can be access in html by using the selector, found in recipe-item.components


DEBUGGING
- console.log("string")
- setting breakpoint
-- use Chrome Developer, Sources-> (left pane) webpack -> . ->
-- set breakpoint by double click
- Visual studio code built-in DEBUGGING
-- see https://code.visualstudio.com/docs/nodejs/angular-tutorial#_debugging-angular
- Network Tab in chrome debugger, for http requests or download files
- Elment - for the UI, xml. Use the click
- Performance & Memory Tab
- https://developers.google.com/web/tools/chrome-devtools/

LIFECYCLE
- ngOnInit (push)-> ionViewWillEnter -> ionViewDidEnter -> ionViewWillLeave -> ionViewDidLeave
- ngOnDestroy (pop)
- actual sequence when leaving
- ionViewWillLeave (old page) -> ionViewWillEnter (new page) -> ionViewDidEnter (new page) -> ionViewDidLeave(old page)
- ngOnDestroy, called when back is press

NEWPROJ
- delete recipes folder
- add new auth page
- add new places page
-- new discover page inside places
--- place-detail inside discover
-- new offers page inside places
--- new new-offer page inside offers
--- new edit-offer page inside offers
--- offer-bookings inside offers
- add new bookings page

ADJUST MAIN ROUTING confi

ADDING TABS
- remove padding on places.html
-- follow tabs format
- routing
-- create a separate file for routing(similar to app-routing.modules.ts) (new in Ionic 4? meron na agad eh)
-- for routing HARDCODED first!
- remove places header

PREPARING DATA SERVICES
- create a data model first
-- new file for place-model
- create a service
- create dummy data in the newly created service

ACCESSING DATA for places
- to access the dummy data from places service to discover page/folder
-- inject it to the discover.page.ts
- configure html for discover.
-- take note of how to access data from the discover.page.ts file