import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsingFormGroupComponent } from './forms/using-form-group/using-form-group.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'signup', component: UsingFormGroupComponent },  // Registration form
  { path: 'profile', component: ProfileComponent },  // Profile form
  { path: 'login', component: LoginComponent },  // Login page
  { path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard], 
    canDeactivate: [CanDeactivateGuard] 
  }, // Lazy loading for Home page
  { path: '', redirectTo: '/home', pathMatch: 'full' },   // Default path to home
  { path: '**', redirectTo: '/login', pathMatch: 'full' }  // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
