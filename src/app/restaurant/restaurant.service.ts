import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Restaurant } from './restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private readonly STORAGE_KEY = 'restaurants';

  constructor() {
    // Initialize local storage with mock data if it's empty
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const initialData: Restaurant[] = [
        { id: '1', name: 'Pizza Palace', description: 'Best pizza in town', location: 'Downtown' },
        { id: '2', name: 'Burger Haven', description: 'Juicy burgers', location: 'Uptown' },
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialData));
    }
  }

  getRestaurants(): Observable<Restaurant[]> {
    const restaurants = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    return of(restaurants);
  }

  addRestaurant(restaurant: Omit<Restaurant, 'id'>): Observable<Restaurant> {
    const restaurants = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const newRestaurant = { ...restaurant, id: this.generateId() };
    restaurants.push(newRestaurant);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(restaurants));
    return of(newRestaurant);
  }

  updateRestaurant(id: string, updatedData: Partial<Restaurant>): Observable<Restaurant | undefined> {
    const restaurants = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const index = restaurants.findIndex((r: Restaurant) => r.id === id);
    if (index !== -1) {
      restaurants[index] = { ...restaurants[index], ...updatedData };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(restaurants));
      return of(restaurants[index]);
    }
    return of(undefined);
  }

  deleteRestaurant(id: string): Observable<boolean> {
    const restaurants = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const updatedRestaurants = restaurants.filter((r: Restaurant) => r.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedRestaurants));
    return of(true);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

