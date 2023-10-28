import { Component } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms'
import { ReadUserInputService } from 'src/app/services/read-user-input.service'

@Component({
  standalone: true,
  selector: 'app-input-bar',
  templateUrl: './input-bar.component.html',
  styleUrls: ['./input-bar.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
})
export class InputBarComponent {
  userInput = ''
  constructor(private readUserInputService: ReadUserInputService) {}

  updateUserInput() {
    this.readUserInputService.updateUserInput(this.userInput)
  }
}
