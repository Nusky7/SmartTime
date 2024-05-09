import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { NotesService } from './services/notes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';

// import { ThemeService } from './services/theme.service';

import { LoginComponent } from './components/login/login.component';
import { NotesComponent } from './components/notes/notes.component';
import { FormularioNotasComponent } from './components/notes/fomulario/fomulario-notas.component';
import { DetallesNotaComponent } from './components/notes/detalles/detalles-nota.component';
import { ListadoNotasComponent } from './components/notes/listado/listado-notas.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { LoginDialogComponent } from './components/login/login-dialog/login-dialog.component';
import { ConfirmComponent } from './components/notes/confirm/confirm.component';
import { ThemeComponent } from './components/theme/theme.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DialogoComponent } from './components/calendar/dialogo/dialogo.component';


// import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotesComponent,
    MenuComponent,
    HomeComponent,
    ThemeComponent,
    FormularioNotasComponent,
    ListadoNotasComponent,
    LoginDialogComponent,
    ConfirmComponent,
    DetallesNotaComponent,
    CalendarComponent,
    ProjectsComponent,
    DialogoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    DatePipe,
    ReactiveFormsModule,
    // MatButtonModule
  ],
  providers: [
    UserService,
    NotesService,
    // ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
