import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

private apiURL = "https://nusky7studio.es/API/index.php";

constructor(private http: HttpClient) { }

  userId: number | null = null;
  nombre: any;


  setUser(userId: number) {
    this.userId = userId;
  }
  getUser(): number | null {
    return this.userId;
  }
  setNombre(nombre: any) {
    this.nombre = nombre;
  }
  getNombre(): string {
    return this.nombre;
  }
  dentroSesion(): boolean {
    return this.userId !== null;
  }

  autenticarUsuario(correo: string, contrasena: string): Observable<any> {
    const usuario = { correo, contrasena };
    // console.log('Datos de usuario:', usuario);
    return this.http.post<any>(`${this.apiURL}/usuario/login`, usuario).pipe(
      tap((res: any) => {
        if (res.usuario && res.usuario.id && res.usuario.nombre) {
          this.setUser(res.usuario.id);
          this.setNombre(res.usuario.nombre);
        }
      })
    );
  }
  
  insertarUsuario(nombre: string, correo: string, contrasena: string): Observable<any> {
    const usuario = { nombre, correo, contrasena };
    return this.http.post<any>(`${this.apiURL}/usuario/registro`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}?id=${id}`);
  }
  
   
}
