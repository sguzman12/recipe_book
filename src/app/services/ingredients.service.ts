import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Ingredient } from '../models/recipe.model'

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private ingredientsSubject = new BehaviorSubject<Ingredient[]>([])
  ingredients$ = this.ingredientsSubject.asObservable()

  displayIngredients(ingredients: Ingredient[]): void {
    this.ingredientsSubject.next(ingredients)
  }
}
