import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  nuevaNotaSubject = new Subject<any>();

  constructor(private http: HttpClient ) { }

private apiURL = "https://nusky7studio.es/API/index.php/notas";
// private notaAgredadaSubject = new Subject<void>();

notaAgredada$ = this.nuevaNotaSubject.asObservable();

mostrarNuevaNota() {
  this.nuevaNotaSubject.next();
}

getUserNotas(user_id: number): Observable<any> {
  return this.http.get<any>(`${this.apiURL}`, {params:{user_id: user_id}});
}

agregarNota(nuevaNota: any): Observable<any> {
  this.nuevaNotaSubject.next(nuevaNota);
  return this.http.post<any>(`${this.apiURL}`, nuevaNota);
}

modificarNota(notaModificada: any): Observable<any> {
  return this.http.put<any>(`${this.apiURL}/${notaModificada.id}`, notaModificada);
}

public eliminarNotas(id: number): Observable<any> {
  const url = `${this.apiURL}/${id}`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.delete(url, {headers: headers});
}


}
