import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ReadUserInputService {
  private userInputSubject = new BehaviorSubject<string>('')
  userInput$ = this.userInputSubject.asObservable()

  constructor() {}

  updateUserInput(input: string) {
    this.userInputSubject.next(input)
  }
}
