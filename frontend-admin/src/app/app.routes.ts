import { Routes } from '@angular/router';
// Fíjate bien en esta línea:
import { LoginComponent } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { RutasSection } from './pages/rutas-section/rutas-section';
import { ZonasSection } from './pages/zonas-section/zonas-section';
import { ObjetosSection } from './pages/objetos-section/objetos-section';
import { UsuariosSection } from './pages/usuarios-section/usuarios-section';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: Dashboard },
    { path: 'rutas', component: RutasSection },
    { path: 'zonas', component: ZonasSection },
    { path: 'objetos', component: ObjetosSection },
    { path: 'usuarios', component: UsuariosSection },
];