import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost/API/index.php'; 



  constructor(private http: HttpClient, private userService: UserService) { }

   

  consultarEventos() {
    return this.http.get(`${this.apiUrl}/eventos`);
  }

  consultarEventoPorId(user_id: number) {
    const userId = this.userService.getUser();
    return this.http.get(`${this.apiUrl}/eventos`, {params:{user_id: user_id}});
  }

  crearEvento(event: any) {
    return this.http.post(`${this.apiUrl}/eventos`, event);
  }

  modificarEvento(event: any) {
    return this.http.put(`${this.apiUrl}/eventos/${event.id}`, event);
  }

  borrarEvento(id: number) {
    return this.http.delete(`${this.apiUrl}/eventos/${id}`);
  }
}
