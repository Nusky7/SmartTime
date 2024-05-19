import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';


export interface Task {
  id: number;
  titulo: string;
  descripcion: number | null;
  completado: boolean;
  color: ThemePalette;
  estado: string | null;
  prioridad: number | null;
}

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

crearProyecto(user_id: number){
  return this.http.post<any>(`${this.apiURL}/proyectos`, {params:{user_id: user_id}});
}

editarTarea(id: number, titulo: string, descripcion: string, completado: boolean, estado: string, prioridad: number): Observable<any> {
  const body = { titulo, descripcion, estado, prioridad, boolean: completado };
  console.log(body);
  return this.http.put(`${this.apiURL}/tareas/${id}`, body);
}


borrarProyecto(){}






}
