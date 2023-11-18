import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Recipe } from '../models/recipe.model'

@Injectable({
  providedIn: 'root',
})
export class WriteNewRecipeEntryService {
  private apiUrl = '../../assets/data/recipes.json'

  constructor(private http: HttpClient) {}

  // Write new data to the JSON file
  writeData(newData: Recipe[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/writeData`, { recipes: newData })
  }
}
