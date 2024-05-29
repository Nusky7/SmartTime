import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
// import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'https://nusky7studio.es/API/index.php/eventos'; 

  constructor(private http: HttpClient, private userService: UserService) { }


  consultarEventoPorId(user_id: number) {
    const userId = this.userService.getUser();
    return this.http.get(`${this.apiUrl}`, {params:{user_id: user_id}});
  }

  crearEvento(event: any) {
    return this.http.post(`${this.apiUrl}`, event);
  }

  modificarEvento(event: any) {
    return this.http.put(`${this.apiUrl}/${event.id}`, event);
  }

  borrarEvento(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

