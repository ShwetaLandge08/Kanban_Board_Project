import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DialogAddProjectComponent } from './dialog-add-project/dialog-add-project.component';
import { DialogAddStageComponent } from './dialog-add-stage/dialog-add-stage.component';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { DialogConfirmDeleteComponent } from './dialog-confirm-delete/dialog-confirm-delete.component';
import { DialogProjectViewComponent } from './dialog-project-view/dialog-project-view.component';
import { ProjectComponent } from './project/project.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardComponent } from './board/board.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { SearchProjectComponent } from './search-project/search-project.component';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ShowProjectDetailsComponent } from './show-project-details/show-project-details.component';
import { ForgotPasswordResetComponent } from './forgot-password-reset/forgot-password-reset.component';
import { GetOtpComponent } from './get-otp/get-otp.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,
    SignUpComponent,
    SignInComponent,
    UpdateUserComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    DialogAddProjectComponent,
    DialogAddStageComponent,
    DialogAddTaskComponent,
    DialogConfirmDeleteComponent,
    DialogProjectViewComponent,
    ProjectComponent,
    ResetPasswordComponent,
    TaskDetailsComponent,
    DashboardComponent,
    BoardComponent,
    SearchProjectComponent,
    ShowProjectDetailsComponent,
    ForgotPasswordResetComponent,
    GetOtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressBarModule,
    MatPaginatorModule,
    NgxPaginationModule,
    Ng2OrderModule,
    MatFormFieldModule ,
    MatInputModule
  ],
  providers: [
    // { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    authInterceptorProviders, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
