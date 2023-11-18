import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Ingredient } from '../models/recipe.model'

@Injectable({
  providedIn: 'root',
})
export class DialogIngredientsService {
  private ingredientsSubject = new BehaviorSubject<Ingredient[]>([])
  ingredients$ = this.ingredientsSubject.asObservable()
  constructor() {}

  addIngredient(ingredient: Ingredient) {
    const currentIngredients = this.ingredientsSubject.value
    this.ingredientsSubject.next([...currentIngredients, ingredient])
  }
}
