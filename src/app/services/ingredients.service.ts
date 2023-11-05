import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Ingredient, Recipe } from '../models/recipe.model'

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private ingredientsSubject = new BehaviorSubject<Ingredient[]>([])
  private recipeSubject = new BehaviorSubject<Recipe>(null)

  ingredients$ = this.ingredientsSubject.asObservable()
  recipe$ = this.recipeSubject.asObservable()

  displayIngredients(ingredients: Ingredient[], recipe: Recipe): void {
    this.ingredientsSubject.next(ingredients)
    this.recipeSubject.next(recipe)
    console.log('IngredientService Recipe: ', recipe)
  }
}
