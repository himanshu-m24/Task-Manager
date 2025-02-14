import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { saveAs } from "file-saver-es";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;  // Format: DD-MM-YYYY
}

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  imports: [CommonModule, FormsModule] 
})
export class ReportComponent implements OnInit {
  fromDate: string = '';
  toDate: string = '';
  selectedStatus: string = 'Select Status';
  statuses = ['pending', 'completed', 'in_progress'];
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get<Task[]>('http://localhost:8080/api/auth/tasks').subscribe({
      next: (data) => {
        this.tasks = data;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter(task => {
      let matchesStatus = true;
      let matchesDateRange = true;

      // Status filter
      if (this.selectedStatus !== 'Select Status') {
        matchesStatus = task.status.toLowerCase() === this.selectedStatus.toLowerCase();
      }

      // Date range filter
      if (this.fromDate && this.toDate) {
        const taskDate = this.convertToDate(task.dueDate);
        const fromDate = new Date(this.fromDate);
        const toDate = new Date(this.toDate);
        
        // Set time to midnight for accurate date comparison
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 999);
        
        if (taskDate) {
          matchesDateRange = taskDate >= fromDate && taskDate <= toDate;
        }
      }

      return matchesStatus && matchesDateRange;
    });
  }

  convertToDate(dateString: string): Date | null {
    if (!dateString) return null;
    
    // Convert from DD-MM-YYYY to a Date object
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  formatDateForDisplay(dateString: string): string {
    const date = this.convertToDate(dateString);
    if (!date) return '';
    
    // Format date as Month DD, YYYY (e.g., March 14, 2025)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  selectStatus(status: string) {
    this.selectedStatus = status;
    this.applyFilters();
  }

  getStatusDisplay(status: string) {
    if (status === 'Select Status') return status;
    return status.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  reset() {
    this.fromDate = '';
    this.toDate = '';
    this.selectedStatus = 'Select Status';
    this.fetchTasks();
  }

  search() {
    this.applyFilters();
  }

  downloadExcel() {
    if (this.filteredTasks.length === 0) {
      alert("No data available to download!");
      return;
    }

    // Format data for Excel
    const excelData = this.filteredTasks.map(task => ({
      'ID': task.id,
      'Title': task.title,
      'Description': task.description,
      'Status': this.getStatusDisplay(task.status),
      'Due Date': task.dueDate // Keep original date format for Excel
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Tasks');

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const fileName = `tasks-report-${new Date().toISOString().split('T')[0]}.xlsx`;
    saveAs(data, fileName);
  }
}