import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import the FormsModule so you can use form-based
// data binding
import { FormsModule } from '@angular/forms';

// Import the HttpModule that defines the Http service
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RegistrationCtaComponent } from './registration-cta/registration-cta.component';
import { LoginCardComponent } from './login-card/login-card.component';
import { SignUpCardComponent } from './sign-up-card/sign-up-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationCtaComponent,
    LoginCardComponent,
    SignUpCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    // Add the functionality of the external Angular
    // forms module to your application module.
    // Import the HttpModule into your application module
    
    HttpModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
