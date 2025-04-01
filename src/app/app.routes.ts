import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
   { path: '', component: MainComponent }, 
    {path:'login',component:LoginComponent},
    {path:'registration',component:RegistrationComponent},
    {path:'dashboard',component:DashboardComponent}
];
