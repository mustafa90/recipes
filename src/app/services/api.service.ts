import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {FavoriteService} from './favorite.service';
import {RecipeModel} from '../models/receipe.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://www.recipepuppy.com/api/';
  constructor(private http: HttpClient, private favService: FavoriteService) {
    console.log('Query service initialized');
  }

  getRecipes(
    keyword: string,
    ingredients: string[],
    page: number
  ): Observable<RecipeModel[]> {
    return this.http
      .get('/api/', {
        params: {
          i: ingredients.join(','),
          q: keyword,
          p: page.toString(),
        },
      })
      .pipe(
        map((resp) => {
          let dataResults = resp['results'];
          dataResults.map((v) => {
            let ingredientArray = v['ingredients'].split(',');
            v['ingredients'] = ingredientArray;
            v['favorite'] = this.favService.getFavorite(v['href']);
          });
          return dataResults;
        })
      );
  }
}
