import { Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { Ingredient, Recipe } from 'src/app/models/recipe.model'

@Component({
  selector: 'app-detailed-screen',
  templateUrl: './detailed-screen.component.html',
  styleUrls: ['./detailed-screen.component.css'],
})
export class DetailedScreenComponent {
  @Input() ingredients: Ingredient[]
  @Input() currentRecipe: Recipe

  completedItems: string[] = []

  toggleCompleted(ingredient: string): void {
    if (this.completedItems.includes(ingredient)) {
      this.completedItems = this.completedItems.filter((item) => item !== ingredient)
    } else {
      this.completedItems.push(ingredient)
    }
  }
}
