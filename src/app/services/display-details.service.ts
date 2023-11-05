import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DisplayDetailsService {
  private showRecipeContainerSubject = new BehaviorSubject<boolean>(true)
  private showDetailsContainerSubject = new BehaviorSubject<boolean>(false)

  showRecipeContainer$: Observable<boolean> = this.showRecipeContainerSubject.asObservable()
  showDetailsContainer$: Observable<boolean> = this.showDetailsContainerSubject.asObservable()

  toggleRecipeContainer(show: boolean): void {
    this.showRecipeContainerSubject.next(show)
  }

  toggleDetailsContainer(show: boolean): void {
    this.showDetailsContainerSubject.next(show)
  }
}
