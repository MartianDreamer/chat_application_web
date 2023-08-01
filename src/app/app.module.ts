import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { ChatAppModule } from './chat-app/chat-app.module';
import { AuthenticationInterceptor } from './interceptor/authentication.interceptor';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegistrationComponent, ConfirmationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChatAppModule,
  ],
  providers: [
    Router,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
