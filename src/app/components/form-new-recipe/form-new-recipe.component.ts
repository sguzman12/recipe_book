import { Component, Inject } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { Ingredient } from 'src/app/models/recipe.model'

@Component({
  standalone: true,
  selector: 'app-form-new-recipe',
  templateUrl: './form-new-recipe.component.html',
  styleUrls: ['./form-new-recipe.component.css'],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatDividerModule,
    MatButtonModule,
  ],
})
export class FormNewRecipeComponent {
  title: string
  category: string
  url_img: string
  description: string
  ingredients: Ingredient[]
  ingredientControl = new FormControl('')
  panelOpenState = true

  constructor(
    public dialogRef: MatDialogRef<FormNewRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  trackOption(index: number, option: any): string {
    return option // or provide a unique identifier for each option
  }
}
