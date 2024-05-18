import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';

import { SecondsToDatePipe } from '../../pipes/secondsToDatePipe';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: User | null = null;

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit(): void {
    this.loadUser();
  }

  async loadUser() {
    this.user = await this.firebaseService.getCurrentUser();
    console.log(this.user);
    
  }

  get date() {
    const pipe = new SecondsToDatePipe();
    return pipe.transform(this.user!.registeredDate.seconds).toISOString();
  }

  logout(): void {
    signOut(this.firebaseService.auth).then(() => {
      console.log('User logged out');
      localStorage.setItem('email', JSON.stringify(''));
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  }
}
