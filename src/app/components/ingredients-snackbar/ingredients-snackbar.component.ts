import { Component, Input } from '@angular/core'
import { Ingredient } from 'src/app/models/recipe.model'
import { IngredientsService } from 'src/app/services/ingredients.service'

@Component({
  standalone: true,
  selector: 'app-ingredients-snackbar',
  templateUrl: './ingredients-snackbar.component.html',
  styleUrls: ['./ingredients-snackbar.component.css'],
})
export class IngredientsSnackbarComponent {
  constructor(private ingredientsService: IngredientsService) {}

  ngOnInit() {
    this.ingredientsService.ingredients$.subscribe((ingredients) => {
      console.log('here', ingredients)
    })
  }

  displayIngredients(ingredients: Ingredient[]): void {
    // alert('here')
    console.log('here')
    ingredients.map((item) => {
      console.log(item)
    })
  }
}
