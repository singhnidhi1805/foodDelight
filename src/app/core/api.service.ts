import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private mockRestaurants = [
    {
      id: '1',
      name: 'Pizza Palace',
      description: 'The best pizza in town',
      location: 'Downtown',
    },
    {
      id: '2',
      name: 'Burger Haven',
      description: 'Juicy burgers with fresh ingredients',
      location: 'Uptown',
    },
  ];

  getRestaurants(): Observable<any[]> {
    return of(this.mockRestaurants);
  }

  addRestaurant(restaurant: any): Observable<any> {
    const newRestaurant = { id: this.generateId(), ...restaurant };
    this.mockRestaurants.push(newRestaurant);
    return of(newRestaurant);
  }

  updateRestaurant(id: string, updatedData: any): Observable<any> {
    const index = this.mockRestaurants.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.mockRestaurants[index] = { ...this.mockRestaurants[index], ...updatedData };
    }
    return of(this.mockRestaurants[index]);
  }

  deleteRestaurant(id: string): Observable<any> {
    this.mockRestaurants = this.mockRestaurants.filter((r) => r.id !== id);
    return of({ success: true });
  }

  private generateId(): string {
    return (this.mockRestaurants.length + 1).toString();
  }
}
