import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth_service/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage = signal<string>('');
  private router = inject(Router);
  private authService = inject(AuthService);
  onLogin() {
    if(!this.username || !this.password) {
      this.errorMessage.set('Por favor, ingresa tu nombre de usuario y contraseña.');
      return;
    }   


    this.authService.login(this.username, this.password).subscribe({      
      next: (response) => {
        const username = typeof response.user === 'string'
          ? response.user
          : response.user?.username;

        if (!username) {
          this.errorMessage.set('No se pudo obtener el usuario de la respuesta.');
          return;
        }

        this.authService.setCurrentUser(username);
        this.router.navigate(['/dashboard/rutas']);
      },
      error: (err) => {
        this.errorMessage.set('Usuario o contraseña incorrectos.');
      }
    });    

  }
}
