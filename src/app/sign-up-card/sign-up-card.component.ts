import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-sign-up-card',
  templateUrl: './sign-up-card.component.html',
  styleUrls: ['./sign-up-card.component.css']
})
export class SignUpCardComponent implements OnInit {


  private username = '';
  private password = '';
  private error: string;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  get disableButton() {
    return this.username.length === 0 ||
           this.password.length === 0;
  }

  submitSignup() {
    // Create the payload to send to the server
    const payload = {
      username: this.username,
      password: this.password
    };

    // Tell the AJAX request to send cookies
    const options = {
      withCredentials: true
    };

// Put the URLs in convenience variables
    const cookieUrl = 'http://localhost:5000/api/clients';
    const sessionUrl = 'http://localhost:5000/api/users';

// Make an AJAX call
this.http

      // Get an CSRF token
      .get(cookieUrl, options)

      .catch(() => this.http.put(sessionUrl, payload, options))
      .subscribe(

      // If everything goes ok, clear the error and do something.
      () => {
      this.error = '';
      console.log('You were Signed Up'); // This is temporary
      },
        // An error occurred when the credentials were
        // PUT to the server.
      e => {

        // If the server responds with a 401, those
        // were bad credentials and you set the error
        // to an appropriate message.
        if (e.status === 401) {
          this.error = 'Could not lSign you Up';
        }
      },
    );
  }
}
