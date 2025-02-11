import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgxPaginationModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  p: number = 1;
  tasks: any[] = [];
  filteredItems: any[] = [];
  searchQuery: string = '';

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
        this.filteredItems = this.tasks;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  applyFilters(): void {
    const queryTerm = this.searchQuery.toLowerCase();
    this.filteredItems = this.tasks.filter((item) =>
      item.title.toLowerCase().includes(queryTerm) || item.status.toLowerCase().includes(queryTerm)
    );
  }

  deleteItem(taskId: number, index: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.tasks.splice(index, 1);
        this.filteredItems = [...this.tasks];
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }
}
