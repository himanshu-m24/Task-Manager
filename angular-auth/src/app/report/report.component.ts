import { Component, OnInit } from '@angular/core';
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
export class ReportComponent implements OnInit{
  isReset: boolean = false; // Initialize as false to show table by default

  statuses: string[] = ['in_progress', 'pending', 'completed'];

  // Add a display map for prettier status display
  statusDisplay: { [key: string]: string } = {
    'in_progress': 'In-Progress',
    'pending': 'Pending',
    'completed': 'Completed', 
  };

  filteredStatuses: string[] = [...this.statuses];
  selectedStatus: string | null = null;
  searchTerm: string = '';
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

  filteredTasks: any[] = [...this.tasks];

  constructor() {}

  ngOnInit() {
    // Initialize filtered tasks with all tasks
    this.filteredTasks = [...this.tasks];
  }

  getStatusDisplay(status: string): string {
    return this.statusDisplay[status] || status;
  }

  // **Filter status options based on input**
  filterStatuses() {
    if (!this.searchTerm) {
      this.filteredStatuses = [...this.statuses];
      return;
    }
    
    this.filteredStatuses = this.statuses.filter(status =>
      this.getStatusDisplay(status).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // **Select status and update dropdown text**
  selectStatus(status: string) {
    this.selectedStatus = status.toLowerCase().replace('-', '_');
    this.searchTerm = '';
    this.filteredStatuses = [...this.statuses];
    this.search();
    this.isReset = false; // Ensure table is visible after search
  }

   // Modified search method
   search() {
    this.filteredTasks = this.tasks.filter(task => {
      const dateMatches = (!this.fromDate || new Date(task.date) >= new Date(this.fromDate)) &&
                         (!this.toDate || new Date(task.date) <= new Date(this.toDate));
      
      const statusMatches = !this.selectedStatus || 
                           task.status.toLowerCase() === this.selectedStatus.toLowerCase();
      
      return dateMatches && statusMatches;
    });
  }

  // **Reset all filters**
  reset() {
    this.selectedStatus = null;
    this.searchTerm = '';
    this.fromDate = '';
    this.toDate = '';
    this.filteredTasks = [...this.tasks];
    this.filteredStatuses = [...this.statuses];
    this.isReset = true; // Hide table on reset
  }

  // **Download filtered data as Excel**
  downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredTasks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Tasks');

  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'filtered-tasks.xlsx');
  }


}
