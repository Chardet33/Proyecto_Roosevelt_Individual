import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly STORAGE_KEY = 'current_user';

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/roosevelt/api/auth/login';

    login(username: string, password: string): Observable<any> {
        return this.http.post(this.apiUrl, { username, password });
    }
    
    // Signal para reactivity
    public currentUser = signal<string | null>(this.getUserFromStorage());

    constructor() { }


    // Guardar el usuario actual en sesión y en el localStorage

    setCurrentUser(username: string): void {
        localStorage.setItem(this.STORAGE_KEY, username);
        this.currentUser.set(username);
    }


    //Obtener el usuario actual

    getCurrentUser(): string | null {
        return this.currentUser();
    }



    //Obtener el usuario del localStorage

    private getUserFromStorage(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.STORAGE_KEY);
        }
        return null;
    }


    //Limpiar la sesión del usuario

    logout(): void {
        localStorage.removeItem(this.STORAGE_KEY);
        this.currentUser.set(null);
    }


    //Verifica si hay usuario autenticado

    isLoggedIn(): boolean {
        return this.currentUser() !== null;
    }
}
