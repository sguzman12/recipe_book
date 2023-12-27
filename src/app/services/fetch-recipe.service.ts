import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { Recipe } from '../models/recipe.model'

@Injectable({
  providedIn: 'root',
})
export class FetchRecipeService {
  private recipeChangeFlagSubject = new BehaviorSubject<boolean>(false)

  recipeChangeFlag = this.recipeChangeFlagSubject.asObservable()

  private apiUrl = 'http://localhost:3000/api/readData'
  constructor(private http: HttpClient) {
    this.getJSON().subscribe((data) => {
      console.log('FetchService', data)
    })
  }

  public getJSON(): Observable<any> {
    return this.http.get<{ recipes: Recipe[] }>(this.apiUrl)
  }

  public changeFlag(flag: boolean): void {
    this.recipeChangeFlagSubject.next(flag)
  }
}
