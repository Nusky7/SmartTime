import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NotesComponent } from './components/notes/notes.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { NotesService } from './services/notes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormularioNotasComponent } from './components/notes/fomulario/fomulario-notas.component';
import { ListadoNotasComponent } from './components/notes/listado/listado-notas.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotesComponent,
    MenuComponent,
    HomeComponent,
    FormularioNotasComponent,
    ListadoNotasComponent
    // FormGroup, 
    // FormControl, 
    // Validators
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    MaterialModule
    // FormGroup, 
    // FormControl, 
    // Validators
  ],
  providers: [
    UserService,
    NotesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
