import { Component, Input, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { Ingredient, Recipe } from 'src/app/models/recipe.model'
import { IngredientsService } from 'src/app/services/ingredients.service'

@Component({
  standalone: true,
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
  imports: [MatCardModule, MatButtonModule],
})
export class RecipeCardComponent {
  @Input() recipes: Recipe

  constructor(private ingredientsService: IngredientsService) {}

  getIngredients(ingredients: Ingredient[]): void {
    console.log('recipe-card_getIngredients', ingredients)
    // this.ingredientsService.displayIngredients(ingredients)
  }
}
