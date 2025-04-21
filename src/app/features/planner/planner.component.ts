import { Component, ViewChild } from '@angular/core';
import { MapComponent } from '@app/map/map.component';
import { DrawerComponent } from '@app/components/drawer/drawer.component';
import { CommandPanelComponent } from '@app/features/planner/command-pannel/command-pannel.component';
import { TripFormComponent } from './trip-form/trip-form.component';

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

  handleOpenDrawer() {
    this.drawer.open();
  }

  handleCloseDrawer(): void {
    this.isDrawerOpen = false;
  }

  centerMapOnUser() {
    // center map to user currentlocation
  }
  handleTripFormSubmit(data: { start: string; end: string }) {
	console.log('Trip form submitted:', data);
  }

}
