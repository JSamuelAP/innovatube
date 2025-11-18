import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../core/types/response.types';
import { Observable } from 'rxjs';
import { Favorite, Video } from '../types/video.types';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private readonly API_URL = 'http://localhost:3000/api/v1/videos';

  private http = inject(HttpClient);

  search(query: string): Observable<ApiResponse<Video[]>> {
    return this.http.get<ApiResponse<Video[]>>(`${this.API_URL}`, {
      params: {
        q: query,
      },
    });
  }

  getFavorites(): Observable<ApiResponse<Video[]>> {
    return this.http.get<ApiResponse<Video[]>>(`${this.API_URL}/favorites`);
  }

  markFavorite(videoId: string): Observable<ApiResponse<Favorite>> {
    return this.http.post<ApiResponse<Favorite>>(
      `${this.API_URL}/${videoId}/favorite`,
      {}
    );
  }

  unmarkFavorite(videoId: string): Observable<ApiResponse<Favorite>> {
    return this.http.delete<ApiResponse<Favorite>>(
      `${this.API_URL}/${videoId}/favorite`,
      {}
    );
  }
}
