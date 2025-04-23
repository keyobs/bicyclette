import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
	selector: 'app-map',
	standalone: true,
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.less']
})
export class MapComponent implements AfterViewInit {
	private defaultCoords: [number, number] = [44.8333, -0.5667]; // Bordeaux fallback
	private map!: L.Map;
	private routeLayer!: L.GeoJSON;

	ngAfterViewInit(): void {
		this.initMap();
	}

	private initMap(): void {
		this.map = L.map('map');

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap contributors'
		}).addTo(this.map);

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const userCoords: [number, number] = [position.coords.latitude, position.coords.longitude];
					this.map.setView(userCoords, 13);

					L.marker(userCoords).addTo(this.map).bindPopup('You are here !').openPopup();
				},
				(error) => {
					console.warn('Geolocation failed, using fallback.', error);
					this.map.setView(this.defaultCoords, 13);
				}
			);
		} else {
			console.warn('Geolocation not supported.');
			this.map.setView(this.defaultCoords, 13);
		}
	}

	public drawRoute(geojson: any): void {
		if (!this.map) return;

		if (this.routeLayer) {
			this.map.removeLayer(this.routeLayer);
		}

		this.routeLayer = L.geoJSON(geojson, {
			style: { color: 'blue', weight: 4 }
		}).addTo(this.map);

		const bounds = this.routeLayer.getBounds().pad(0.1);
		this.map.fitBounds(bounds);
	}
}
