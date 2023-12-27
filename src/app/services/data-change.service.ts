import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DataChangeService {
  private recipeChangeFlagSubject = new BehaviorSubject<boolean>(false)

  recipeChangeFlag = this.recipeChangeFlagSubject.asObservable()

  constructor() {}

  public changeFlag(flag: boolean): void {
    this.recipeChangeFlagSubject.next(flag)
  }
}
