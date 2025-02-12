import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-edit',
  imports: [CommonModule,FormsModule],
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

  constructor(private taskService: TaskService, private router: Router) {}
  addTask() {
    this.taskService.addTask(this.task).subscribe(response => {
      console.log('Task added successfully:', response);
      this.router.navigate(['/home']); // Redirect to home after adding task
    }, error => {
      console.error('Error adding task:', error);
    });

  }
}
