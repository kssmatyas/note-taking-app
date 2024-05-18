import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'note-taking-app';



  get isLoggedIn() {
    const email = JSON.parse(localStorage.getItem('email') as string);

    return !(email == null || email === '')
  }
}
