import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { ApiService } from '../services/api.service';
import { RecipeModel } from '../models/receipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public searchField: string;
  public unfilteredRecipes: RecipeModel[] = [];
  public recipes: RecipeModel[] = [];
  public ingredients: string[] = [];
  public isLoading = false;
  public pageIndex = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  // Execute only when typing in the form
  updateForm() {
    this.pageIndex = 1;
    this.getRecipes(false);
  }

  // Ask the API service for recipes
  public getRecipes(isInfinityScroll) {
    this.isLoading = true;
    if (this.searchField.length > 0) {
      this.apiService
        .getRecipes(this.searchField, this.ingredients, this.pageIndex)
        .subscribe(
          (v) => {
            this.isLoading = false;
            if (isInfinityScroll) {
              this.recipes = this.recipes.concat(v);
            } else {
              this.recipes = v;
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.recipes = [];
      this.isLoading = false;
    }
  }

  // Update Ingredient
  updateIngredient(ingredient: string) {
    if (this.ingredients.indexOf(ingredient.trim()) === -1) {
      this.setIngredient(ingredient);
    } else {
      this.removeIngredient(ingredient);
    }
  }

  // Add ingredient to filters
  setIngredient(ingredient: string) {
    if (this.ingredients.indexOf(ingredient.trim()) === -1) {
      this.ingredients.push(ingredient.trim());
      this.getRecipes(false);
    }
  }

  // Remove ingredient of filters
  removeIngredient(ingredient: string) {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
    this.getRecipes(false);
  }
  onScroll() {
    if (!this.isLoading) {
      this.pageIndex++;
      this.getRecipes(true);
    }
  }
}
