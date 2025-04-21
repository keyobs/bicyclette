import { Component, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-command-panel',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	templateUrl: 'command-pannel.component.html',
	styleUrls: ['command-pannel.component.less']
})
export class CommandPanelComponent {
	@Output() openDrawer = new EventEmitter<void>();
	@Output() locate = new EventEmitter<void>();
	@Output() openRegisteredTripsList = new EventEmitter<void>();

	onOpenTripFormDrawer() {
		this.openDrawer.emit();
	}

	onOpenRegisteredTrips() {
		this.openRegisteredTripsList.emit();
	}

	onLocate() {
		this.locate.emit();
	}
}
