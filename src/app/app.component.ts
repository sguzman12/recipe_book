import { Component, OnInit } from '@angular/core'
import { FetchRecipeService } from './services/fetch-recipe.service'
import { IngredientsService } from './services/ingredients.service'
import { Ingredient, Recipe } from './models/recipe.model'
import { ReadUserInputService } from './services/read-user-input.service'
import { DisplayDetailsService } from './services/display-details.service'

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
  showRecipeContainer: boolean = true
  showDetailsContainer: boolean = false
  userInput: string
  currentRecipe: Recipe

  constructor(
    private recipeService: FetchRecipeService,
    private userInputService: ReadUserInputService,
    private ingredientService: IngredientsService,
    private displayDetailsService: DisplayDetailsService,
  ) {
    this.displayDetailsService.showRecipeContainer$.subscribe((show) => (this.showRecipeContainer = show))
    this.displayDetailsService.showDetailsContainer$.subscribe((show) => (this.showDetailsContainer = show))
  }

  ngOnInit(): void {
    // Retrieve Recipes
    this.recipeService.getJSON().subscribe((data) => {
      this.recipes = data.recipes
      this.displayedRecipes = data.recipes

      this.dataLoaded = true
    })

    // Retrieve user Input and filter
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

    // Retrieve ingredients
    this.ingredientService.ingredients$.subscribe((ingredients) => {
      console.log('App Component Ingredients', ingredients)
      this.ingredients = ingredients
    })

    // Retrieve current Recipe
    this.ingredientService.recipe$.subscribe((c_recipe) => {
      console.log('App Component Current Recipe', c_recipe)
      this.currentRecipe = c_recipe
      if (c_recipe !== null) {
        this.toggleContainers()
      }
    })
  }

  toggleContainers() {
    this.displayDetailsService.toggleRecipeContainer(!this.displayDetailsService.showRecipeContainer$)
    this.displayDetailsService.toggleDetailsContainer(!this.displayDetailsService.showDetailsContainer$)
  }
}
