import { Component, Inject } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormControl, FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
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
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatDividerModule,
    MatButtonModule,
  ],
})
export class FormNewRecipeComponent {
  title: string
  category: string
  url_img: ''
  description: string
  userIngredientInput: string
  ingredients: Ingredient[]
  errors: string[]
  ingredientControl = new FormControl('')
  panelOpenState = true
  items: string[]

  constructor(
    public dialogRef: MatDialogRef<FormNewRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.ingredients = []
    this.title = ''
    this.category = ''
    this.url_img = ''
    this.description = ''
    this.errors = []
  }

  addIngredient(): void {
    if (this.userIngredientInput.trim() !== '') {
      let newIngredient: Ingredient = { ing_name: this.userIngredientInput }
      // this.dialogIngredientService.addIngredient(newIngredient);
      this.ingredients.push(newIngredient)
      this.userIngredientInput = ''
      this.updateIngredientPanel()
    }
  }

  updateIngredientPanel() {
    const ingredientPanel = document.getElementById('ingredientList')
    ingredientPanel.innerHTML = ''

    this.ingredients.forEach((ingredient) => {
      const listItem = document.createElement('li')
      listItem.textContent = ingredient.ing_name
      ingredientPanel.appendChild(listItem)
    })
  }

  onSubmit(): void {
    let inputValid: boolean = false

    inputValid = this.validateInput()
    if (inputValid) {
      alert('Success')
    } else {
      if (this.title.trim() === '') {
        this.errors.push('Please enter a recipe name')
      }
      if (this.description.trim() === '') {
        this.errors.push('Please give your dish a description')
      }
      if (!this.category) {
        this.errors.push('Please select a food category')
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  validateInput(): boolean {
    if (this.title.trim() !== '' && this.description.trim() !== '' && this.category !== '') {
      return true
    }
    return false
  }

  trackOption(index: number, option: any): string {
    return option // or provide a unique identifier for each option
  }
}
