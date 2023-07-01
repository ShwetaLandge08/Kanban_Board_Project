import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthCanDeactiveGuard } from './_guards/auth-can-deactive.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  //{ path: 'task/:taskId', component: TaskDetailsComponent, canDeactivate: [AuthCanDeactiveGuard] },
  { path: 'update', component: UpdateUserComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'dashboard/:id', component: BoardComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
