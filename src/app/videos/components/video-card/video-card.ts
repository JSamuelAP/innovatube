import { Component, inject, input, output, signal } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { Favorite, Video } from '../../types/video.types';
import { VideoService } from '../../services/video.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../core/types/response.types';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-video-card',
  imports: [CardModule, ButtonModule],
  templateUrl: './video-card.html',
  styleUrl: './video-card.css',
})
export class VideoCard {
  private videoService = inject(VideoService);
  private messageService = inject(MessageService);

  video = input.required<Video>();

  favorited = signal(false);

  youtubeUrl(): string {
    const id = this.video().id;
    if (!id) return '#';
    return `https://www.youtube.com/watch?v=${id}`;
  }

  toggleFavorite(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    console.log(this.favorited());
    if (!this.favorited()) {
      this.markFavorite();
    } else {
      this.unmarkFavorite();
    }
  }

  markFavorite() {
    this.videoService.markFavorite(this.video().id).subscribe({
      next: (res) => {
        this.handleSuccess(res);
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }

  unmarkFavorite() {
    this.videoService.unmarkFavorite(this.video().id).subscribe({
      next: (res) => {
        this.handleSuccess(res);
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }

  handleSuccess(res: ApiResponse<Favorite>) {
    this.favorited.update((currentValue) => !currentValue);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: res.message,
      life: 2000,
    });
  }

  handleError(error: HttpErrorResponse) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.error.message,
      life: 4000,
    });
  }
}
