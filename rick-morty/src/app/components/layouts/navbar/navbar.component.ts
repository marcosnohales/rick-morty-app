import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    private router: Router
  ){}

  getLogo(): string {
    return 'assets/images/logo_navbar.png';
  }

  navigateTo(route: string): void {
    this.router.navigate(['/' + route]);
  }
}
