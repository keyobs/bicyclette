import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements AfterViewInit {
  
  ngAfterViewInit(): void {
    // Initialize the map with a default view (e.g., Paris)
    const map = L.map('map').setView([48.8566, 2.3522], 13);

    // Set the tile layer for the map (OpenStreetMap in this case)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  }
}