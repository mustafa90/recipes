import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() {
    console.log('Favorite service initialized');
  }

  // CRUD LOCAL STORAGE OPERATIONS

  getFavorite(url: string): boolean {
    return Boolean(localStorage.getItem(url));
  }
  setFavorite(url: string) {
    localStorage.setItem(url, 'true');
  }
  removeFavorite(url: string) {
    localStorage.removeItem(url);
  }
}
