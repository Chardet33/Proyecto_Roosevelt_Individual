import { Routes } from '@angular/router';
// Fíjate bien en esta línea:
import { LoginComponent } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { RutasSection} from './components/rutas-section/rutas-section';
import { ZonasSection } from './components/zonas-section/zonas-section';
import { ObjetosSection } from './components/objetos-section/objetos-section';
import { UsuariosSection } from './components/usuarios-section/usuarios-section';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: Dashboard,
        children: [
            {path: 'rutas', component: RutasSection},
            {path: 'zonas', component: ZonasSection},
            {path: 'objetos', component: ObjetosSection},
            {path: 'usuarios', component: UsuariosSection}
        ]
     },
    { path: '**', redirectTo: '' }
];