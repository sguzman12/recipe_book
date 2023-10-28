import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component'
import { IngredientsSnackbarComponent } from './components/ingredients-snackbar/ingredients-snackbar.component'
import { InputBarComponent } from './components/input-bar/input-bar.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, RecipeCardComponent, InputBarComponent, IngredientsSnackbarComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
