import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/layouts/navbar/navbar.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showNavBar = true;

  constructor(
    private router: Router
  )
  {
    this.router.events.subscribe(() => {
      this.showNavBar = this.router.url !== '/' && this.router.url !== '/main';
    });
  }


}
