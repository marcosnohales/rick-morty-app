import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(
    private router: Router
  ){}

  getImage(): string {
    return 'assets/images/rick_morty_background.jpg';
  }

  navigateToCharacters(): void {
    this.router.navigate(['/characters']);
  }
}
