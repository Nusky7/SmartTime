import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProyectosService {

private apiURL = "http://localhost/API/index.php";

constructor(private http: HttpClient) { }


getUserProyectos(user_id: number) {
  return this.http.get<any>(`${this.apiURL}/proyectos`, {params:{user_id: user_id}});
}

getUserTareas(project_id: number) {
  return this.http.get<any>(`${this.apiURL}/tareas?project_id=${project_id}`);
}

getUserSubtareas(tarea_id: number) {
  return this.http.get<any>(`${this.apiURL}/subtareas?tarea_id=${tarea_id}`);
}

  

crearProyecto(){}

editarProyecto(){}

borrarProyecto(){}






}
