import { UserService } from '../../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

constructor(private userService: UserService, private router: Router) {}

email: string = '';
pass: string = '';
errorMsg: string = '';

onSubmit(): void {
  this.userService.autenticarUsuario(this.email, this.pass).subscribe({
    next: (response) => {
      // Aquí debes almacenar la información del usuario en el localStorage
      // y redirigir al usuario a la página principal de la aplicación
      localStorage.setItem('user', JSON.stringify(response));
      this.router.navigate(['/notas']);
    },
    error: (error) => {
      // Aquí debes manejar el error de autenticación y mostrar un mensaje de error en la interfaz de usuario
      this.errorMsg = 'Correo electrónico o contraseña incorrectos';
    }
  });
}


registrar() {
  const nuevoUsuario = {
    email: this.email,
    password: this.pass
  };

  this.userService.insertarUsuario(nuevoUsuario).subscribe(
    (response) => {
      console.log('Usuario registrado correctamente', response);
      // Aquí puedes redirigir al usuario a la página de inicio de sesión o a otra página de tu aplicación
    },
    (error) => {
      console.error('Error al registrar el usuario', error);
      // Aquí puedes mostrar un mensaje de error en la interfaz de usuario
    }
  );
}

}
