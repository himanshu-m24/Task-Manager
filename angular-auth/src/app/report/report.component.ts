import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import * as XLSX from 'xlsx';
import { saveAs } from "file-saver-es";


@Component({
  selector: 'app-report',
  imports: [FormsModule,CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  fromDate: string = '';
  toDate: string = '';

  
  tasks:any [] = [
    {
      id: 1,
      title: "Website Redesign",
      description: "Complete overhaul of company website with modern UI/UX principles",
      status: "in_progress",
      date: "2025-02-15"
    },
    {
      id: 2,
      title: "Quarterly Financial Report",
      description: "Prepare Q1 2025 financial analysis and performance metrics",
      status: "pending",
      date: "2025-03-31"
    },
    {
      id: 3,
      title: "Employee Training Program",
      description: "Develop comprehensive onboarding materials for new hires",
      status: "completed",
      date: "2025-01-20"
    },
    {
      id: 4,
      title: "Product Launch Campaign",
      description: "Plan and execute marketing strategy for new product line",
      status: "planned",
      date: "2025-04-10"
    },
    {
      id: 5,
      title: "Server Maintenance",
      description: "Scheduled downtime for system updates and security patches",
      status: "pending",
      date: "2025-02-28"
    },
    {
      id: 6,
      title: "Client Presentation",
      description: "Prepare slides and materials for annual client review meeting",
      status: "in_progress",
      date: "2025-02-05"
    },
    {
      id: 7,
      title: "Mobile App Update",
      description: "Release version 2.5 with new features and bug fixes",
      status: "completed",
      date: "2025-01-15"
    },
    {
      id: 8,
      title: "Team Building Event",
      description: "Organize outdoor activities and workshops for department",
      status: "planned",
      date: "2025-05-20"
    },
    {
      id: 9,
      title: "Data Migration",
      description: "Transfer legacy system data to new cloud platform",
      status: "in_progress",
      date: "2025-03-15"
    },
    {
      id: 10,
      title: "Budget Review",
      description: "Analyze department spending and prepare 2025 projections",
      status: "completed",
      date: "2025-01-31"
    },
    {
      id: 11,
      title: "Social Media Strategy",
      description: "Develop content calendar and engagement guidelines",
      status: "pending",
      date: "2025-03-01"
    },
    {
      id: 12,
      title: "Customer Survey",
      description: "Conduct annual satisfaction survey and analyze results",
      status: "planned",
      date: "2025-04-15"
    },
    {
      id: 13,
      title: "Office Renovation",
      description: "Coordinate with contractors for workspace modernization",
      status: "in_progress",
      date: "2025-02-20"
    },
    {
      id: 14,
      title: "Security Audit",
      description: "Review and update company security protocols",
      status: "completed",
      date: "2025-01-25"
    },
    {
      id: 15,
      title: "Vendor Negotiations",
      description: "Review and renew annual service contracts",
      status: "pending",
      date: "2025-03-10"
    },
    {
      id: 16,
      title: "API Documentation",
      description: "Update technical documentation for external developers",
      status: "planned",
      date: "2025-04-30"
    },
    {
      id: 17,
      title: "Email Campaign",
      description: "Design and launch spring promotional newsletter",
      status: "in_progress",
      date: "2025-02-10"
    },
    {
      id: 18,
      title: "Inventory Audit",
      description: "Complete quarterly stock assessment and reporting",
      status: "completed",
      date: "2025-01-10"
    },
    {
      id: 19,
      title: "HR Policy Update",
      description: "Revise employee handbook and company policies",
      status: "pending",
      date: "2025-03-20"
    },
    {
      id: 20,
      title: "Quality Assurance Review",
      description: "Conduct comprehensive product quality assessment",
      status: "planned",
      date: "2025-05-01"
    }
  ];

  // fillter to apply date with condition
  filteredTasks: any[] = [];

  constructor() {
    this.filteredTasks = [...this.tasks]; // Initially show all tasks
  }

  search() {
    if (this.fromDate && this.toDate){
      const from = new Date(this.fromDate).getTime();
      const to = new Date(this.toDate).getTime();
      this.filteredTasks = this.tasks.filter(task => {
        const taskDate = new Date(task.date).getTime();
        return taskDate >= from && taskDate <= to;
      });
    } else {
      this.filteredTasks = []; // Hide table if no date selected
    }

  }

  reset() {
    this.fromDate = '';
    this.toDate = '';
    this.filteredTasks = []; // Reset to original list

    // Reset any other search parameters
  }

  downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredTasks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Tasks');

  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'filtered-tasks.xlsx');
  }


}
