import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Recipe } from '../models/recipe.model'

@Injectable({
  providedIn: 'root',
})
export class WriteNewRecipeEntryService {
  private apiUrl = 'http://localhost:3000/api/writeData'

  constructor(private http: HttpClient) {}

  // Write new data to the JSON file
  writeData(newData: Recipe): Observable<any> {
    const formattedData = this.formatJSONData(newData)

    console.log('After', formattedData)

    return this.http.post(this.apiUrl, formattedData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    })
  }

  formatJSONData(newData: Recipe): string {
    const recipesArray = [newData]

    return JSON.stringify({ recipes: recipesArray })
  }
}
