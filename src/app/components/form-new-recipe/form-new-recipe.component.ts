import { Component, Inject } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormControl, FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { Recipe } from 'src/app/models/recipe.model'
import { Ingredient } from 'src/app/models/recipe.model'
import { WriteNewRecipeEntryService } from 'src/app/services/write-new-recipe-entry.service'
import { S3ImagesService } from 'src/app/services/s3-images.service'
import * as _ from 'lodash'

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
  s3_url: ''

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FormNewRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private newEntry: WriteNewRecipeEntryService,
    private s3Images: S3ImagesService,
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
      let newIngredient: Ingredient = { ingredient: { ing_name: this.userIngredientInput } }
      this.ingredients.push(newIngredient)
      this.updateIngredientPanel()
      this.userIngredientInput = ''
    }
  }

  updateIngredientPanel() {
    const ingredientPanel = document.getElementById('ingredientList')
    ingredientPanel.innerHTML = ''

    this.ingredients.forEach((ingredient) => {
      const listItem = document.createElement('li')
      listItem.textContent = ingredient.ingredient.ing_name
      ingredientPanel.appendChild(listItem)
    })
  }

  onSubmit(): void {
    let inputValid: boolean = false

    inputValid = this.validateInput()
    if (inputValid) {
      console.log('input is valid')
      this.buildRecipe()
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

  buildRecipe() {
    const formattedIngredients = this.ingredients.map((ingredient) => {
      return { ingredient: { ing_name: ingredient.ingredient.ing_name } }
    })

    let newRecipe: Recipe = {
      title: this.title,
      category: this.category,
      url_img: '',
      description: this.description,
      ingredients: formattedIngredients,
    }

    this.newEntry.writeData(newRecipe).subscribe({
      next: (response) => {
        console.log('Data written successfully', response)
        this.successConfirmationMessage()
        this.dialogRef.close()
        this.clearFormInput()
      },
      error: (error) => {
        console.error('Error writing data', error)
      },
      complete: () => console.log('Completed Without Errors'),
    })
  }

  clearFormInput(): void {
    this.title = ''
    this.category = ''
    this.description = ''
    this.ingredients = []
    const ingredientPanel = document.getElementById('ingredientList')
    ingredientPanel.innerHTML = ''
  }

  // processFile(imageInput: File) {
  //   // this.s3Images.retrieveURL().subscribe((url) => {
  //   //   this.s3Images.postImage(imageInput, url).subscribe({
  //   //     next: (response) => {
  //   //       console.log('Image Uploaded successfully:', response)
  //   //     },
  //   //     error: (error) => {
  //   //       console.error('Error uploading image:', error)
  //   //     },
  //   //     complete: () => console.log('Completed upload without errors'),
  //   //   })
  //   // })
  //   console.log(imageInput)
  //   this.s3Images.postImage(imageInput).subscribe({
  //     next: (response) => {
  //       console.log('Image Uploaded successfully:', response)
  //     },
  //     error: (error) => {
  //       console.log('Error uploading image:', error)
  //     },
  //     complete: () => console.log('Completed upload without errors'),
  //   })
  // }

  processFile(event: any) {
    console.log(event)
    const fileList: FileList = event.target.files
    if (fileList.length > 0) {
      const imageFile: File = fileList[0]
      this.s3Images.postImage(imageFile).subscribe({
        next: (response) => {
          console.log('Image Uploaded successfully:', response)
        },
        error: (error) => {
          console.log('Error uploading image:', error)
        },
        complete: () => console.log('Completed upload without errors'),
      })
    }
  }

  trackOption(index: number, option: any): string {
    return option // or provide a unique identifier for each option
  }

  successConfirmationMessage(): void {
    alert('Successfully Uploaded Recipe')
  }
}
