import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { HttpClientModule } from '@angular/common/http';
import { EditComponent } from './edit/edit.component';
import { TaskSearchComponent } from './task-search/task-search.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'addtask', component: AddtaskComponent },
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'report', component: ReportComponent},
  { path: 'task-search', component: TaskSearchComponent},
  { path: 'edit/:id', component: EditComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
  
];


@NgModule({
  declarations: [
    
  ],
  imports: [
    
     // Add FormsModule here
    RouterModule.forRoot(routes), // Import RouterModule with routes
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    AddtaskComponent,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    CommonModule,
    HttpClientModule
   ],
  providers: [],
 
})
export class AppModule {}
