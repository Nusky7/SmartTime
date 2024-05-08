import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  nuevaNotaSubject = new Subject<any>();

  constructor(private http: HttpClient ) { }

private apiURL = "http://localhost/API/index.php";
private notaAgredadaSubject = new Subject<void>();

notaAgredada$ = this.nuevaNotaSubject.asObservable();

  mostrarNuevaNota() {
    this.nuevaNotaSubject.next();
  }

consultarNotas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiURL}/notas`);
}


consultarNotaPorId(user_id: number): Observable<any> {
  return this.http.get<any>(`${this.apiURL}/notas`, {params:{user_id: user_id}});
}

agregarNota(nuevaNota: any): Observable<any> {
  this.nuevaNotaSubject.next(nuevaNota);
  return this.http.post<any>(`${this.apiURL}/notas`, nuevaNota);
}

modificarNota(notaModificada: any): Observable<any> {
  return this.http.put<any>(`${this.apiURL}/notas/${notaModificada.id}`, notaModificada);
}

public eliminarNotas(id: number): Observable<any> {
  const url = `http://localhost/API/index.php/notas/${id}`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.delete(url, {headers: headers});
}


}
