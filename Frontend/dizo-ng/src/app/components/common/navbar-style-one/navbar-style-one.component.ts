import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-style-one',
  templateUrl: './navbar-style-one.component.html',
  styleUrls: ['./navbar-style-one.component.scss']
})
export class NavbarStyleOneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isLoggedIn(): boolean {
    return document.cookie.includes('authToken=');
  }
  
  logout(): void {
    document.cookie = 'authToken=; path=/; max-age=0';
    window.location.href = '/sign-in'; // or use this.router.navigate(['/sign-in']);
  }

}

