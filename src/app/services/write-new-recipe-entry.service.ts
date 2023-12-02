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
    console.log('Before', newData)

    const jsonData = JSON.stringify({ recipes: newData })

    console.log('After', newData)

    return this.http.post(this.apiUrl, jsonData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    })
  }
}
