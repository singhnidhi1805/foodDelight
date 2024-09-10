import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { ReactiveFormsModule } from '@angular/forms';  // Import this

@NgModule({
  declarations: [
    RestaurantListComponent,
    RestaurantFormComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,  // Import MatCardModule
    MatButtonModule ,// Import MatButtonModule
    ReactiveFormsModule  
  ]
})
export class RestaurantModule { }
