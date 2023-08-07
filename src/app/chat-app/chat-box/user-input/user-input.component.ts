import { Component } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent {
  backspaceEvent(e) {
    const val = e.target.value;
    const count = val.split('\n').length;
    e.target.rows = count < 5 ? count : 5;
    console.log(count);
  }

  enter(e) {
    e.preventDefault();
  }
}
