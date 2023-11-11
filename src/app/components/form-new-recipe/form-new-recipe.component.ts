import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  standalone: true,
  selector: 'app-form-new-recipe',
  templateUrl: './form-new-recipe.component.html',
  styleUrls: ['./form-new-recipe.component.css'],
})
export class FormNewRecipeComponent {
  constructor(public dialogRef: MatDialogRef<FormNewRecipeComponent>) {}
}
