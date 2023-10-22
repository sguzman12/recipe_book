import { Component, OnInit } from '@angular/core'
import { FetchRecipeService } from './services/fetch-recipe.service'
import { Recipe } from './models/recipe.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  recipes: Recipe[]
  dataLoaded: boolean = false

  constructor(private recipeService: FetchRecipeService) {}

  ngOnInit(): void {
    this.recipeService.getJSON().subscribe((data) => {
      this.recipes = data.recipes
      console.log('App component', this.recipes)

      this.dataLoaded = true
    })
  }

  // getRecipe(private title: string): void {

  // }
}
