import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiURL = "http://localhost/API/index.php";


  constructor(private http: HttpClient) { }

  userId: number | null = null;

  setUser(userId: number) {
    this.userId = userId;
  }
  getUser(): number | null {
    return this.userId;
  }

  autenticarUsuario(correo: string, contrasena: string): Observable<any> {
    const usuario = { correo, contrasena };
    console.log('Datos de usuario:', usuario);
    return this.http.post<any>(`${this.apiURL}/usuario/login`, usuario);
}

  // Obtener todos los usuarios
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/index.php`);
  }

  insertarUsuario(nombre: string, correo: string, contrasena: string): Observable<any> {
    const usuario = { nombre, correo, contrasena };
    return this.http.post<any>(`${this.apiURL}/usuario/registro`, usuario);
  }

  // Actualizar un usuario existente
  actualizarUsuario(usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/index.php`, usuario);
  }

  // Eliminar un usuario por su ID
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/index.php?id=${id}`);
  }
  
   
}
