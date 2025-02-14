import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

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

  constructor(private router: Router, private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
        this.filteredItems = this.tasks;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });

  }


  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    // Assuming date format is DD-MM-YYYY
    const [day, month, year] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }


  applyFilters(): void {
    const queryTerm = this.searchQuery.toLowerCase();
    this.filteredItems = this.tasks.filter((item) =>
      item.title.toLowerCase().includes(queryTerm) || item.status.toLowerCase().includes(queryTerm)
    );
  }

  deleteItem(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.filteredItems = [...this.tasks];
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  // Download Excel file function
  downloadExcel(task: any): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([{
      'ID': task.id,
      'Title': task.title,
      'Description': task.description,
      'Status': task.status,
      'Due Date': task.dueDate // Ensure this is in DD-MM-YYYY format
    }]);
  
    const workbook: XLSX.WorkBook = { Sheets: { 'Task': worksheet }, SheetNames: ['Task'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(data, `Task_${task.id}.xlsx`);
  }
  
  
}
