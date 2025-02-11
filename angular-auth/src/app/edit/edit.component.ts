import { Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  task = {
    title: '',
    description: '',
    Date: '',
    status: ''
  };


  addTask() {
    console.log('Task Added:', this.task);

  }
}
