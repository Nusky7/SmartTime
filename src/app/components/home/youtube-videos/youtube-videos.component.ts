import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-youtube-videos',
  templateUrl: './youtube-videos.component.html',
  styleUrls: ['./youtube-videos.component.scss']
})
export class YoutubeVideosComponent implements OnInit {
  videos: any[] = [];
  query: string = 'organización proyectos tiempo';

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit(): void {
    this.buscarVideos();
  }

  buscarVideos(): void {
    this.noticiasService.buscarVideos(this.query).subscribe(videos => {
      this.videos = videos;
    });
  }
}
