// app.routes.ts
import { Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant/restaurant-list/restaurant-list.component';
import { RestaurantFormComponent } from './restaurant/restaurant-form/restaurant-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'restaurants/add', component: RestaurantFormComponent },
  { path: 'restaurants/edit/:id', component: RestaurantFormComponent },
  { path: '**', redirectTo: '/restaurants' }
];
