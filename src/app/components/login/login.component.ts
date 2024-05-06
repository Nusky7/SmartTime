import { UserService } from '../../services/user.service';
import { Component } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

constructor(private userService: UserService, private router: Router,
  // private _snackBar: MatSnackBar,
  private dialog: MatDialog) {}

correo: string = '';
contrasena: string = '';
nombre: string = '';
errorMsg: string = '';
mostrarNombre: boolean = false;


validarCorreo(correo: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
}

openDialog(message: string): void {
  const dialogRef = this.dialog.open(LoginDialogComponent, {
    data: { message: message }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El diálogo se cerró');
  });
}

nombreRegistro() {
  if (this.mostrarNombre) {
    if (this.nombre && this.correo && this.contrasena) {
      this.registrar();
    }
  } else {
    console.log("Error al registrar");
  }
}

onSubmit(): void {
  this.userService.autenticarUsuario(this.correo, this.contrasena).subscribe({
    next: (response) => {
      if (!this.correo || !this.contrasena || !this.validarCorreo(this.correo)) {
        this.openDialog("Por favor ingrese un correo electrónico válido y una contraseña");
        return;
      }
      if (response.usuario && response.token) {
        localStorage.setItem('user', JSON.stringify(response));
        this.userService.setUser(response.usuario.id);
        this.router.navigate(['/home']);
        console.log(response.usuario.id);
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


public registrar() {

  const passRegex = /^.{4,}$/;

  if (!this.nombre || !this.correo || !this.contrasena) {
    this.openDialog("Rellene todos los campos con información válida");
    return;
  }
  if (this.nombre, this.correo, this.contrasena){
  this.userService.insertarUsuario(this.nombre,this.correo, this.contrasena).subscribe(
    (response) => {
      if (!this.nombre && !this.correo || !passRegex.test(this.contrasena) || !this.validarCorreo(this.correo)) {
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

