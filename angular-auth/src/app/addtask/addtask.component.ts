import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addtask',
  imports: [CommonModule, FormsModule],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css'
})
export class AddtaskComponent {
  task = {
    title: '',
    description: '',
    dueDate: '',
    status: ''
  };


  addTask() {
    console.log('Task Added:', this.task);

  }
}
