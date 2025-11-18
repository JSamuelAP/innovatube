import { Component, input } from '@angular/core';

import { Video } from '../../types/video.types';
import { VideoCard } from '../video-card/video-card';

@Component({
  selector: 'app-video-list',
  imports: [VideoCard],
  templateUrl: './video-list.html',
  styleUrl: './video-list.css',
})
export class VideoList {
  videos = input<Video[]>([]);
}
