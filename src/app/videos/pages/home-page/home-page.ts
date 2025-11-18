import { Component, inject, signal } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { SearchBar } from '../../components/search-bar/search-bar';
import { VideoService } from '../../services/video.service';
import { VideoList } from '../../components/video-list/video-list';
import { Video } from '../../types/video.types';

@Component({
  selector: 'home-page',
  imports: [SearchBar, VideoList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private videoService = inject(VideoService);

  protected query = signal<string>('');
  protected videos = signal<Video[]>([]);

  onSearch(searchValue: string) {
    this.query.set(searchValue.trim());
    if (this.query().length === 0) return;

    this.videoService.search(searchValue).subscribe({
      next: (data) => {
        this.videos.set(data.data);
      },
      error: (err) => {
        console.error('Search error:', err);
      },
    });
  }
}
