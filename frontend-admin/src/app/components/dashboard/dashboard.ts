import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { RouterOutlet,RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  
  constructor(private router: Router) {}
  
  logout() {
  this.router.navigate(['/']);
  }

  
}
