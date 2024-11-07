// items/items.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuard } from '../auth.guard';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { NameLengthPipe } from '../name-length.pipe';

const routes: Routes = [
    
    
    
  { path: '', component: HomeComponent,canActivate: [AuthGuard],canDeactivate:[CanDeactivateGuard],
    children:[
        { path: '123', component:  ProfileComponent, pathMatch: 'full' },   // Default path to form-group
        { path: '**', redirectTo: '/home', pathMatch: 'full' }  // Wildcard route,the routing that doesnt exist
      ]
   } // Default route for the items module
  
];

@NgModule({
  declarations: [HomeComponent,ProfileComponent, NameLengthPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) // Use forChild to register routes in a lazy-loaded module
  ]
})
export class HomeModule {}
