import { Component } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms'
import { ReadUserInputService } from 'src/app/services/read-user-input.service'
import { FormNewRecipeComponent } from '../form-new-recipe/form-new-recipe.component'

@Component({
  standalone: true,
  selector: 'app-input-bar',
  templateUrl: './input-bar.component.html',
  styleUrls: ['./input-bar.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
})
export class InputBarComponent {
  userInput = ''
  autoCompleteOptions: string[] = ['Cherry', 'Onion', 'Chicken', 'Steak', 'Cheese']
  constructor(
    private readUserInputService: ReadUserInputService,
    public dialog: MatDialog,
  ) {}

  updateUserInput() {
    this.readUserInputService.updateUserInput(this.userInput)
  }

  showRecipeForm(): void {
    const enterAnimationDuration = '1000ms'
    const exitAnimationDuration = '1500ms'

    this.dialog.open(FormNewRecipeComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { options: this.autoCompleteOptions },
    })
  }
}
