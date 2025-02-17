import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent {
  taskId: number | null = null;
  task: any = null;
  searchError: string = '';

  // For image uploads
  file1: File | null = null;
  file2: File | null = null;

  constructor(private taskService: TaskService) {}

  // Searches for a task by its ID from the backend
  searchTask(): void {
    if (this.taskId == null) {
      this.searchError = "Please enter a task ID.";
      this.task = null;
      return;
    }
    this.taskService.getTaskById(this.taskId).subscribe({
      next: data => {
        this.task = data;
        this.searchError = '';
      },
      error: err => {
        this.task = null;
        this.searchError = "Task not found or error occurred.";
        console.error(err);
      }
    });
  }

  // Handle file input change for the first image
  onFile1Change(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.file1 = event.target.files[0];
    }
  }

  // Handle file input change for the second image
  onFile2Change(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.file2 = event.target.files[0];
    }
  }

  // Dummy method for uploading Image 1
  uploadFile1(): void {
    if (!this.file1) {
      alert("Please select an image for upload 1.");
      return;
    }
    // Here you would implement the actual upload logic using your file upload service.
    console.log("Uploading image 1:", this.file1);
    alert("Image 1 uploaded successfully (dummy).");
  }

  // Dummy method for uploading Image 2
  uploadFile2(): void {
    if (!this.file2) {
      alert("Please select an image for upload 2.");
      return;
    }
    // Here you would implement the actual upload logic.
    console.log("Uploading image 2:", this.file2);
    alert("Image 2 uploaded successfully (dummy).");
  }
}
