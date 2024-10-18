import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsingFormGroupComponent } from './forms/using-form-group/using-form-group.component';
import { LoginComponent } from './login/login.component';  // Import login component
import { HomeComponent } from './home/home.component';    // Import home component
import { AuthGuard } from './auth.guard';                 // Import AuthGuard
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  { path: 'signup', component: UsingFormGroupComponent },  // Registration form
  { path: 'login', component: LoginComponent },             // Login page
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],canDeactivate:[CanDeactivateGuard] }, // Home page protected by AuthGuard
  { path: '', redirectTo: '/login', pathMatch: 'full' },   // Default path to form-group
  { path: '**', redirectTo: '/login', pathMatch: 'full' }  // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
