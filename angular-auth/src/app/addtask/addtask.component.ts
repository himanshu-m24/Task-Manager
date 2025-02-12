import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

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
