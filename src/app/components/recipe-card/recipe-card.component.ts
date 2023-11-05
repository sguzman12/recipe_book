import { Component, Input, Renderer2 } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { Ingredient, Recipe } from 'src/app/models/recipe.model'
import { DisplayDetailsService } from 'src/app/services/display-details.service'
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

  constructor(
    private ingredientsService: IngredientsService,
    private displayDetailService: DisplayDetailsService,
    private renderer: Renderer2,
  ) {}

  getIngredients(ingredients: Ingredient[], recipe: Recipe): void {
    this.ingredientsService.displayIngredients(ingredients, recipe)

    // Setting container to display: none
    const container = document.querySelector('.recipe-container')
    this.renderer.setStyle(container, 'pointer-events', 'none')
    this.displayDetailService.toggleRecipeContainer(false)
    this.displayDetailService.toggleDetailsContainer(true)
  }
}
