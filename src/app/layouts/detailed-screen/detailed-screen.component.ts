import { Component, Input, Renderer2 } from '@angular/core'
import { Ingredient, Recipe } from 'src/app/models/recipe.model'
import { DisplayDetailsService } from 'src/app/services/display-details.service'

@Component({
  selector: 'app-detailed-screen',
  templateUrl: './detailed-screen.component.html',
  styleUrls: ['./detailed-screen.component.css'],
})
export class DetailedScreenComponent {
  @Input() ingredients: Ingredient[]
  @Input() currentRecipe: Recipe

  completedItems: string[] = []

  constructor(
    private displayDetailsService: DisplayDetailsService,
    private renderer: Renderer2,
  ) {}

  toggleCompleted(ingredient: string): void {
    if (this.completedItems.includes(ingredient)) {
      this.completedItems = this.completedItems.filter((item) => item !== ingredient)
    } else {
      this.completedItems.push(ingredient)
    }
  }

  returnRecipes(): void {
    const container = document.querySelector('.recipe-container')
    this.renderer.setStyle(container, 'pointer-events', 'auto')
    this.displayDetailsService.toggleRecipeContainer(true)
    this.displayDetailsService.toggleDetailsContainer(false)
  }
}
