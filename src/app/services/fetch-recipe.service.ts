import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Recipe } from '../models/recipe.model'

@Injectable({
  providedIn: 'root',
})
export class FetchRecipeService {
  constructor(private http: HttpClient) {
    this.getJSON().subscribe((data) => {
      console.log('FetchService', data)
    })
  }
  public getJSON(): Observable<any> {
    return this.http.get<{ recipes: Recipe[] }>('../../assets/data/recipes.json')
  }
}
