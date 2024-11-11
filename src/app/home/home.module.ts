import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuard } from '../auth.guard';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { NameLengthPipe } from '../name-length.pipe';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule for the action buttons
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule if you use icons in buttons

import { ShareModule } from '../share/share.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    children: [
      { path: '123', component: ProfileComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    NameLengthPipe,
    // AddressPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule, // Add MatTableModule
    MatButtonModule, // Add MatButtonModule for buttons
    MatIconModule,
    ShareModule, // Add MatIconModule if using icons,
    ReactiveFormsModule
   ]
})
export class HomeModule {}
