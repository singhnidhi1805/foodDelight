import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../restaurant.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss'],
})

export class RestaurantFormComponent implements OnInit {
  restaurantForm: FormGroup;
  isEditMode = false;
  restaurantId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.restaurantId = params.get('id');
      if (this.restaurantId) {
        this.isEditMode = true;
        this.loadRestaurantData(this.restaurantId);
      }
    });
  }

  loadRestaurantData(id: string): void {
    this.restaurantService.getRestaurants().subscribe((restaurants: Restaurant[]) => {
      const restaurant = restaurants.find((r: Restaurant) => r.id === id);
      if (restaurant) {
        this.restaurantForm.patchValue(restaurant);
      }
    });
  }

  submitForm(): void {
    if (this.restaurantForm.valid) {
      if (this.isEditMode && this.restaurantId) {
        this.restaurantService.updateRestaurant(this.restaurantId, this.restaurantForm.value)
          .subscribe(() => {
            this.router.navigate(['/restaurants']);
          });
      } else {
        this.restaurantService.addRestaurant(this.restaurantForm.value)
          .subscribe(() => {
            this.router.navigate(['/restaurants']);
          });
      }
    }
  }
  cancelForm(): void {
    this.router.navigate(['/restaurants']);
  }
}
