import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GeoapifyService {
	private apiKey = environment.geoapifyApiKey;

	constructor(private http: HttpClient) {}

	autocompleteCitySearch(query: string): Observable<any[]> {
		if (!query) return of([]);
		const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&type=city&apiKey=${this.apiKey}`;
		return this.http.get<any>(url).pipe(map((res) => res.features || []));
	}
}
