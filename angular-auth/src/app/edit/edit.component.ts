import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import this
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-edit',
  imports:[FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  task: any = {
    id: null,
    title: '',
    description: '',
    dueDate: '',
    status: ''
  };

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // ngOnInit() {
  //   const taskId = this.route.snapshot.paramMap.get('id'); // ✅ Get ID from URL
  //   if (taskId) {
  //     this.taskService.getTaskById(Number(taskId)).subscribe(task => {
  //       this.task = task; // ✅ Set task data
  //     });
  //   }
  // }
  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTaskById(Number(taskId)).subscribe({
        next: (task) => { this.task = task; },
        error: (err) => { console.error('Error fetching task:', err); }
      });
    }
  }
  

  updateTask() {
    this.taskService.updateTask(this.task).subscribe(response => {
      console.log(this.task);
      console.log('Task updated successfully:', response);
      this.router.navigate(['/home']); // ✅ Redirect after updating
    }, error => {
      console.error('Error updating task:', error);
    });
  }
}