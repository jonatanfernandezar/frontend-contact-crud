import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MisContactsComponent } from './pages/mis-contacts/mis-contacts.component';
import { DashboardContactsComponent } from './pages/dashboard-contacts/dashboard-contacts.component';
import { DashboardUserComponent } from './pages/dashboard-user/dashboard-user.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'dashboard-user', component: DashboardUserComponent},
    {path: 'create-contact', component: DashboardContactsComponent },
    {path: 'edit-contact', component: EditContactComponent },
    {path: '**', redirectTo: '/login', pathMatch: 'full'}
];
