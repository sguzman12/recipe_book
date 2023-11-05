import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { MatButtonModule } from '@angular/material/button'
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component'
import { IngredientsSnackbarComponent } from './components/ingredients-snackbar/ingredients-snackbar.component'
import { InputBarComponent } from './components/input-bar/input-bar.component'
import { DetailedScreenComponent } from './layouts/detailed-screen/detailed-screen.component'

@NgModule({
  declarations: [AppComponent, DetailedScreenComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    RecipeCardComponent,
    InputBarComponent,
    IngredientsSnackbarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
