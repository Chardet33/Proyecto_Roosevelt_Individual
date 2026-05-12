import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  username:string = '';
  password:string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.username === 'admin' && this.password === '1234') {
    this.router.navigate(['/dashboard']);
    } else {
      alert('Credenciales incorrectas. Intenta con admin/1234');
    }
  }
}
