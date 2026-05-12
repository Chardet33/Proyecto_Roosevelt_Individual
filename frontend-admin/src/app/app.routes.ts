import { Routes } from '@angular/router';
// Fíjate bien en esta línea:
import { Login } from './components/login/login'; 

export const routes: Routes = [
  { path: '', component: Login }
];