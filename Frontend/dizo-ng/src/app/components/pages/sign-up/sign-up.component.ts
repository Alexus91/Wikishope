import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service'; // Adjust path if necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  fullName: string = '';
  password: string = '';
  email: string = '';

  constructor(private readonly userService: UserService, private readonly router: Router) {}

  onSignUp() {
    // Ensure all fields are populated before submitting
    if (this.fullName && this.password && this.email) {
      console.log('Sending payload:', { fullName: this.fullName, email: this.email, password: this.password });

      this.userService.signup(this.fullName, this.email, this.password).subscribe({
        next: response => {
          console.log('User signed up successfully:', response);
          this.router.navigate(['/sign-in']); // Redirect to sign-in page after successful sign-up
        },
        error: error => {
          console.error('Sign up error:', error);
          // Handle the error (e.g., show an error message)
        }
      });
    } else {
      console.log('Please fill in all fields.');
    }
  }
}