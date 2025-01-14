import { Routes } from '@angular/router';
import { HomeComponent } from './structure/components/home/home.component';
import { FAQsComponent } from './structure/components/faqs/faqs.component';
import { AboutUsComponent } from './structure/components/about-us/about-us.component';
import { MemberComponent } from './structure/components/member/member.component';
import { LoginComponent } from './structure/components/login/login.component';
import { RegisterComponent } from './structure/components/login/register/register.component';
import { FormComponent } from './structure/shared/form/form.component';
import { InstallationComponent } from './structure/components/installation/installation.component';
import { ReservationComponent } from './structure/components/reservation/reservation.component';
import { ToolComponent } from './structure/components/tool/tool.component';
import { HistoryComponent } from './structure/components/history/history.component';
import { ReportsComponent } from './structure/components/reports/reports.component';
import { UserComponent } from './structure/components/user/user.component';
import { TimetableComponent } from './structure/components/timetable/timetable.component';
import { UserFormComponent } from './structure/components/user/user-form/user-form.component';
import { InstallationFormComponent } from './structure/components/installation/installation-form/installation-form.component';
import { ToolFormComponent } from './structure/components/tool/tool-form/tool-form.component';
import { ReportFormComponent } from './structure/components/reports/report-form/report-form.component';
import { TimetableformComponent } from './structure/components/timetable/timetableform/timetableform.component';
import { ReservaInstallComponent } from './structure/components/reservation/reserva-install/reserva-install.component';
import { ReservaHerraComponent } from './structure/components/reservation/reserva-herra/reserva-herra.component';
// import { SideMenuComponent } from './structure/components/side-menu/side-menu.component';

export const routes: Routes = [
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: HomeComponent},
    {path: 'About-Us',component: AboutUsComponent},
    {path: 'FAQs', component: FAQsComponent},
    {path: 'Member', component: MemberComponent},
    // {path: 'Login', component: LoginComponent},
    // {path: 'Register',component:RegisterComponent},
    {path:'User',component:UserComponent},
    {path:'UserForm',component:UserFormComponent},
    {path:'Installation',component:InstallationComponent},
    // 
    // {path:'InstallForm',component:InstallationFormComponent},
    {path:'Reservation',component:ReservationComponent},
    {path:'Tool',component:ToolComponent},
    {path:'ToolForm',component:ToolFormComponent},
    {path:'History',component:HistoryComponent},
    {path:'Report',component:ReportsComponent},
    {path:'ReportForm',component:ReportFormComponent},
    // {path:'SideMenu',component:SideMenuComponent},
    {path:'Time',component:TimetableComponent},
    // {path:'TimeForm',component:TimetableformComponent},
    {path:'Reserva_Instal',component:ReservaInstallComponent},
    {path:'Reserva_Herr',component:ReservaHerraComponent}
];
