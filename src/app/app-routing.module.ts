import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant/restaurant-list/restaurant-list.component';
import { RestaurantFormComponent } from './restaurant/restaurant-form/restaurant-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },  // Redirect empty path to 'restaurants'
  { path: 'restaurants', component: RestaurantListComponent },   // List all restaurants
  { path: 'restaurants/add', component: RestaurantFormComponent }, // Add new restaurant
  { path: 'restaurants/edit/:id', component: RestaurantFormComponent },  // Edit existing restaurant
  { path: '**', redirectTo: '/restaurants' }  // Redirect all other paths to the restaurants list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Use `forRoot` to set up routing
  exports: [RouterModule]
})
export class AppRoutingModule { }
