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

ADD FORWARDING NAVIGATIOn
- add button("MORE") to see the detail of the featured place
-- add router routerLink
- set other loaded place detail w/ an arrow, so users will know its clickable
-- use detail attribute in xml

- add back button
- add default ref when the forwarded page is reloaded
- add a Book button, on the place detail
-- set a onclick listener
- create the method of the onClick listener (.ts file nya)
-- using navCtrl, setup for a back function

NAVIGATING VIA toolbar
- buttons on a toolbar should be in a <ion-buttons>
- add buttons on offer pages

- use ActivatedRoute for subscribing to dynamic links

ADDING THE SIDE MENU
- side menu should be added, on the discover, offer and bookings pages
- OR to get it to float across the whole app. put in on app.component.html
- create action for opening/closing
-- goto the concern page(e.g. offers page), create a ion-buttons, ion-menu-button
-- if multiple side menu, use menuId, menu="m1"

- can also use menuCtrl (see discover)
- for onclick functions, add a button in the html

ADDING AUTHENTICATION GUARD
- ionic generate guard auth/auth
-- select implement CanLoad
-- delete auth.guard.spec.ts
-- CanActivate, CanLoad(runs before the lazyload is fetch )
-- are also srevices
- inject auth.services in auth.guard.ts
-- return the boolean if user isauthenticated
- add guard block on pages in app routing

ADDING MODAL
- generate a component bookings/create-booking
-- whenever opening a component (not router, not selector)
-- put it in a entryComponents:[CreateBookingComponent]
- link it to place-detail component (since it is the one that will use it)

PASSING DATA
- you can pass data by using componentProps to the create  method (keypair value)

ION-GRID
- <ion-grid>, <ion-row>, <ion-column>
- 12 column size
- grid-> row -> column
- add a fixed attribute to limit the grid width
- add a "no-padding" to remove padding
- controlling size by -> size="10"
-- size-sm, -sm, md, lg, xl 
- centering by using -> offset="4" <-from the left ang measurement
- vertical alignment adjustment-> align-items-stretch, -start, -end, -center
- horizontal alignment adjust-> justify-content-start, -end, -center

List vs grid
- LIST
-- renders <ion-item> vertically, top to bottom
-- contains ion-item only
-- use for scrollable, vertical list content

- GRID
-- renders any content
-- ion-grid => ion-row => ion-column
-- use for any content that should be structured on a grid

- ion-label inside ion-item, for holding text related 
-- can also have other html headers
-- position="floating", the label floats when it is click

- ion-text
-- for styling a text color, (simple)

SLIDABLE ION-item
- use <ion-item-sliding>, then put the <ion-item> inside it
-- at the end,(still inside ion-item-sliding), put ion-item-options, w/ child ion-item-option
-- reference something in html by adding #

Virtual scrolling
- will not render if not on the view port( not shown on the screen)
- performance optimization
- advantageous for long list/updating list.

<ION-IMG>
- lazy loading(loads only when needed)
- ion-avatar -> round border
- ion-thumbnail -> straight border

ADD segmented buttons
- see the syntax on how it created a customevent
- the value="text", is a form of id that can be accessed