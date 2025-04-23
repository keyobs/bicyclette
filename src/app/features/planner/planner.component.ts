import { Component, ViewChild } from '@angular/core';
import { MapComponent } from '@app/map/map.component';
import { DrawerComponent } from '@app/components/drawer/drawer.component';
import { CommandPanelComponent } from '@app/features/planner/command-pannel/command-pannel.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { OpenRouteService } from '@app/core/api/openrouteservice.service';

@Component({
	selector: 'app-planner',
	standalone: true,
	imports: [MapComponent, DrawerComponent, CommandPanelComponent, TripFormComponent],
	templateUrl: './planner.component.html',
	styleUrls: ['./planner.component.less']
})
export class PlannerComponent {
	isDrawerOpen = false;

	@ViewChild('tripCreationDrawer') drawer!: DrawerComponent;
	@ViewChild('mapComponent') mapComponent!: MapComponent;

	constructor(private openRouteService: OpenRouteService) {}

	handleOpenDrawer() {
		this.drawer.open();
	}

	handleCloseDrawer(): void {
		this.isDrawerOpen = false;
	}

	centerMapOnUser() {
		// center map to user currentlocation
	}

	displayRoute(routeGeoJson: any) {
		this.mapComponent?.drawRoute(routeGeoJson);
	}

	handleTripFormSubmit(data: { start: string; startCoords: [number, number]; end: string; endCoords: [number, number] }) {
		this.openRouteService.getCyclingRoute(data.startCoords, data.endCoords).subscribe((routeGeoJson) => {
			this.displayRoute(routeGeoJson);
		});
	}
}
