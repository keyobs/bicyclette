import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenRouteService {
  private apiKey = environment.openRouteServiceApiKey;
  private baseUrl = 'https://api.openrouteservice.org/v2/directions/cycling-regular/geojson';

  constructor(private http: HttpClient) {}

  getCyclingRoute(start: [number, number], end: [number, number]) {
    const body = {
      coordinates: [
        [start[1], start[0]],
        [end[1], end[0]]
      ]
    };

    const hop = this.http.post(this.baseUrl, body, {
      headers: {
        'Authorization': this.apiKey,
        'Content-Type': 'application/json'
      }
    });

    return hop.pipe(
      map((res: any) => res)
    );
  }
}
