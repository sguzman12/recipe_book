import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
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
    console.log(newData)
    return this.http.post(this.apiUrl, { recipes: newData })
  }
}
