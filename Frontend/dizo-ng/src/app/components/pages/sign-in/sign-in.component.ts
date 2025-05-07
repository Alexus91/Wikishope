import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router'; // For navigation after login

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSignIn(): void {
    console.log('Sign-in clicked');
    console.log('email:', this.email);
    console.log('Password:', this.password);

    // Call the UserService login method
    this.userService.login(this.email, this.password).subscribe({
      next: (response) => {
        document.cookie = `authToken=${response.token}; path=/; max-age=${response.expiresIn / 1000}`;

        console.log('Login successful!', response);
        alert('Login successful!');
        this.router.navigate(['/home']); // Redirect to dashboard or home page after successful login
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid username or password.';
      },
    });
  }
}


