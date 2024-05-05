import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotesComponent } from './components/notes/notes.component';
import { LoginComponent } from './components/login/login.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'notas', component: NotesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'calendar', component: CalendarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
