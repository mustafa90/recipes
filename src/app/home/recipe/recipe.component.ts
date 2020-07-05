import {Component, EventEmitter, Host, Input, OnInit, Output} from '@angular/core';
import { RecipeModel } from '../../models/receipe.model';
import {HomeComponent} from '../home.component';
import {FavoriteService} from '../../services/favorite.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  constructor(private favService: FavoriteService) {}

  @Input() recipe: RecipeModel;
  @Input() public ingredients: string[];
  @Output() getRecipes = new EventEmitter<string>();
  @Output() removeIngredient = new EventEmitter<string>();

  ngOnInit(): void {}

  // Get the ngClass ingredient style
  getIngredientClass(ingredient: string): string {
    switch (this.ingredients.includes(ingredient.trim())) {
      case false:
        return 'tag is-darker';
      case true:
        return 'tag is-darker is-link';
    }
  }

  // Update Ingredient
  updateIngredient(ingredient: string) {
    if (this.ingredients.indexOf(ingredient.trim()) === -1) {
      this.setIngredient(ingredient);
    } else {
      this.removeIngredient.next(ingredient);
    }
  }

  // Add ingredient to filters
  setIngredient(ingredient: string) {
    if (this.ingredients.indexOf(ingredient.trim()) === -1) {
      this.ingredients.push(ingredient.trim());
      this.getRecipes.next(ingredient);
    }
  }

  updateFavorite(recipe: RecipeModel) {
    recipe.favorite
      ? this.favService.removeFavorite(recipe.href)
      : this.favService.setFavorite(recipe.href);
    recipe.favorite = this.favService.getFavorite(recipe.href);
  }

  // Open recipe url
  openPage(url: string) {
    window.open(url , '_blank');
  }
}
