import { GeoapifyService } from '@app/core/api/geoapify.service';
import { OpenRouteService } from '@app/core/api/openrouteservice.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';

@Component({
	selector: 'app-creation-trip-form',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatAutocompleteModule,
		MatOptionModule,
		AsyncPipe,
		NgFor
	],
	templateUrl: './trip-form.component.html',
	styleUrls: ['./trip-form.component.less'],
	providers: [GeoapifyService, OpenRouteService]
})
export class TripFormComponent {
	@Output() submitted = new EventEmitter<{
		start: string;
		startCoords: [number, number];
		end: string;
		endCoords: [number, number];
	}>();

	form: FormGroup;
	startSuggestions$: Observable<any[]> = of([]);
	endSuggestions$: Observable<any[]> = of([]);

	private selectedStartCoords: [number, number] | null = null;
	private selectedEndCoords: [number, number] | null = null;

	routeFound = new EventEmitter<any>();

	constructor(
		private fb: FormBuilder,
		private geoapify: GeoapifyService,
		private openRouteService: OpenRouteService
	) {
		this.form = this.fb.group({
			start: [''],
			end: ['']
		});

		this.startSuggestions$ = this.form.get('start')!.valueChanges.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			switchMap((value) => this.geoapify.autocompleteCitySearch(value))
		);

		this.endSuggestions$ = this.form.get('end')!.valueChanges.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			switchMap((value) => this.geoapify.autocompleteCitySearch(value))
		);
	}

	onStartSelect(feature: any): void {
		this.form.get('start')?.setValue(this.formatLocation(feature) || feature.properties.formatted, {
			emitEvent: false
		});
		this.selectedStartCoords = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
	}

	onEndSelect(feature: any): void {
		this.form.get('end')?.setValue(this.formatLocation(feature) || feature.properties.formatted, {
			emitEvent: false
		});
		this.selectedEndCoords = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
	}

	formatLocation(suggestion: any): string {
		const { city, postcode, county, country } = suggestion.properties;
		const parts = [city, postcode, county, country].filter(Boolean);
		return parts.join(', ');
	}

	submit(): void {
		if (this.form.valid && this.selectedStartCoords && this.selectedEndCoords) {
			this.submitted.emit({
				start: this.form.value.start,
				startCoords: this.selectedStartCoords,
				end: this.form.value.end,
				endCoords: this.selectedEndCoords
			});
		}
	}

	getRoute() {
		if (this.selectedStartCoords && this.selectedEndCoords) {
			this.openRouteService
				.getCyclingRoute(this.selectedStartCoords, this.selectedEndCoords)
				.subscribe((response: any) => {
					const routeGeoJson = response?.features?.[0] || null;
					if (routeGeoJson) {
						this.routeFound.emit(routeGeoJson);
					}
			});
		}
	}
}
