import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsingFormGroupComponent } from './forms/using-form-group/using-form-group.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NameLengthPipe } from './name-length.pipe'; 
@NgModule({
  declarations: [
    AppComponent,
    UsingFormGroupComponent,
    LoginComponent,
    HomeComponent,
    NameLengthPipe  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule  ,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
