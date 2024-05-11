import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

private apiURL = "http://localhost/API/index.php";


  constructor(private http: HttpClient) { }

getProyectos(){}

crearProyecto(){}

editarProyecto(){}

borrarProyecto(){}






}
