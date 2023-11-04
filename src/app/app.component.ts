import { Component, OnInit } from '@angular/core'
import { FetchRecipeService } from './services/fetch-recipe.service'
import { IngredientsService } from './services/ingredients.service'
import { Ingredient, Recipe } from './models/recipe.model'
import { ReadUserInputService } from './services/read-user-input.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  recipes: Recipe[]
  ingredients: Ingredient[]
  displayedRecipes: Recipe[]
  dataLoaded: boolean = false
  ingredientsRecieved: boolean = false
  userInput: string

  constructor(
    private recipeService: FetchRecipeService,
    private userInputService: ReadUserInputService,
    private ingredientService: IngredientsService,
  ) {}

  ngOnInit(): void {
    this.recipeService.getJSON().subscribe((data) => {
      this.recipes = data.recipes
      this.displayedRecipes = data.recipes

      this.dataLoaded = true
    })

    this.userInputService.userInput$.subscribe((input) => {
      this.userInput = input

      if (this.recipes !== undefined) {
        console.log('Recipes not undefined')
        if (this.userInput.length === 0) {
          this.displayedRecipes = this.recipes
        } else {
          this.displayedRecipes = this.recipes.filter((recipe) => {
            const userInputLower = this.userInput.toLowerCase()
            return (
              recipe.category.toLowerCase().includes(userInputLower) ||
              recipe.title.toLowerCase().includes(userInputLower)
            )
          })
        }
      }
    })

    this.ingredientService.ingredients$.subscribe((ingredients) => {
      this.ingredients = ingredients
    })
  }
}
