import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { YoutubeResponse } from '../components/home/youtube-videos/youtube-response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiKey: string | undefined = environment.youtubeApiKey;
  private apiUrl: string = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient,) { 
    console.log('API Key:', this.apiKey); 
  }

  buscarVideos(query: string, maxResults: number = 10): Observable<any> {
    const params: any = {
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults,
      key: this.apiKey
    };

    return this.http.get<YoutubeResponse>(`${this.apiUrl}/search`, { params })
      .pipe(
        map(response => response.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.medium.url
        }))),
        catchError(error => {
          console.error('Error en la solicitud a la API de YouTube:', error);
          return of([]);
        })
      );
  }
}
