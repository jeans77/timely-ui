import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {

  // The TypeScript compiler requires that you have
  // these. You set them to default values of empty
  // strings.
  private username = '';
  private password = '';
  private error: string;

  // Get Angular to inject the Http service into your
  // class when it creates your component. Now, you
  // can use it to make AJAX calls!

  constructor(private http: Http) { }

  ngOnInit() {
  }

  // A getter that allows that you will bind to the
  // button to make sure that it's disabled properly.

  get disableButton() {
    return this.username.length === 0 ||
           this.password.length === 0;
  }

  // Here's a method that the button can use when a
  // person clicks the button.
  submitCredentials() {
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
    const sessionUrl = 'http://localhost:5000/api/session/mine';

    // Make an AJAX call
    this.http

      // Get an CSRF token
      .get(cookieUrl, options)

      // If getting the CSRF token fails, then submit
      // the login credentials to the server.

      .catch(() => this.http.put(sessionUrl, payload, options))
      .subscribe(

        // If everything goes ok, clear the error and do something.
        () => {
          this.error = '';
          console.log('logged in'); // This is temporary
        },
        // An error occurred when the credentials were
        // PUT to the server.
        e => {
        
          // If the server responds with a 401, those
          // were bad credentials and you set the error
          // to an appropriate message.
          if (e.status === 401) {
            this.error = 'Could not log in with those credentials';
          }
        },
      );
    }
}
