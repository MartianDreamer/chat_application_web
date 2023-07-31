import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { ChatAppModule } from './chat-app/chat-app.module';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegistrationComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ChatAppModule],
  providers: [Router],
  bootstrap: [AppComponent],
})
export class AppModule { }
