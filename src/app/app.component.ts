import { Component, OnInit } from '@angular/core'
import { FetchRecipeService } from './services/fetch-recipe.service'
import { Recipe } from './models/recipe.model'
import { ReadUserInputService } from './services/read-user-input.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  recipes: Recipe[]
  dataLoaded: boolean = false
  userInput: string

  constructor(
    private recipeService: FetchRecipeService,
    private userInputService: ReadUserInputService,
  ) {}

  ngOnInit(): void {
    this.recipeService.getJSON().subscribe((data) => {
      this.recipes = data.recipes
      console.log('App component', this.recipes)

      this.dataLoaded = true
    })

    this.userInputService.userInput$.subscribe((input) => {
      this.userInput = input
      console.log(this.userInput)
    })
  }
}
