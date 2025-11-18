import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchBar } from '../../components/search-bar/search-bar';
import { VideoList } from '../../components/video-list/video-list';
import { Video } from '../../types/video.types';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'favorites-page',
  imports: [SearchBar, VideoList],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css',
})
export class FavoritesPage implements OnInit {
  private videoService = inject(VideoService);

  protected query = signal<string>('');
  protected videos = signal<Video[]>([]);
  protected tempVideos = signal<Video[]>([]);

  ngOnInit(): void {
    this.videoService.getFavorites().subscribe({
      next: (data) => {
        this.videos.set(data.data);
        this.tempVideos.set(data.data);
      },
      error: (err) => {
        console.error('Search error:', err);
      },
    });
  }

  onSearch(searchValue: string) {
    this.query.set(searchValue.trim().toLowerCase());
    if (this.query().length === 0) {
      this.videos.set(this.tempVideos());
      return;
    }

    this.videos.set(
      this.tempVideos().filter((video) =>
        video.title.toLowerCase().includes(this.query())
      )
    );
  }
}
