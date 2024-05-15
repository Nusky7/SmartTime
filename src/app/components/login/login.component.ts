import { UserService } from '../../services/user.service';
import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  correo: string = '';
  contrasena: string = '';
  nombre: string = '';
  errorMsg: string = '';
  mostrarNombre: boolean = false;

constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.userService.dentroSesion()) {
      this.router.navigate(['/home']);
    }
  }

// Validación de E-mail correcto
private validarCorreo(correo: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
}
// Abrir el diálogo para los mensajes de error o confirmación
private openDialog(message: string): void {
  const dialogRef = this.dialog.open(LoginDialogComponent, {
    data: { message: message }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('El diálogo se cerró');
  });
}

// Método para iniciar sesión
onSubmit(): void {
  this.userService.autenticarUsuario(this.correo, this.contrasena).subscribe({
    next: (response) => {
      if (!this.contrasena || !this.validarCorreo(this.correo)) {
        this.openDialog("Por favor ingrese un correo electrónico válido y una contraseña");
        return;
      }
      if (response.usuario && response.token) {
        localStorage.setItem('user', JSON.stringify(response));
        this.userService.setUser(response.usuario.id);
        this.router.navigate(['/home']);

        console.log(response.usuario.id, response.usuario.nombre);
        console.log('Iniciada Sesión');
        console.log(response);
      } else if (response.status === 'error') {
        this.openDialog(response.mensaje);
      }
    },
    error: (error) => {
      console.log("Inicio fallido", error);
      this.openDialog("Error de inicio de sesión. Por favor, inténtalo de nuevo más tarde.");
    }
  });
}

// Método para validar los campos en Registro y llamar a su función.
nombreRegistro() {
  if (this.mostrarNombre) {
    if (this.nombre && this.correo && this.contrasena) {
      this.registrar();
    }
  } else {
    console.log("Error al registrar");
  }
}

// Método para registrar un nuevo usuario
registrar() {
  const passRegex = /^.{4,}$/;

  if (!this.nombre || !this.correo || !this.contrasena) {
    this.openDialog("Rellene todos los campos con información válida");
    return;
  }
  if (this.nombre, this.correo, this.contrasena){
  this.userService.insertarUsuario(this.nombre,this.correo, this.contrasena).subscribe(
    (response) => {
      if (!this.nombre || !passRegex.test(this.contrasena) || !this.validarCorreo(this.correo)) {
        this.openDialog("Por favor, ingrese un nombre, un correo electrónico y una contraseña válidos");
        return;
      }
      console.log('Usuario registrado correctamente', response);
      this.openDialog("Usuario registrado. Inicie sesión.");
      this.mostrarNombre = false;
      this.correo = this.correo;
      this.contrasena = "";
      },
    (error) => {
      console.log('Error al registrar el usuario', error);
      this.errorMsg = "Error al registrar el usuario";
    }
  );
}}
}

