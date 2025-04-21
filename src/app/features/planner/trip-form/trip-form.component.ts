import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-creation-trip-form',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
	templateUrl: './trip-form.component.html',
	styleUrls: ['./trip-form.component.less']
})
export class TripFormComponent {
	@Output() submitted = new EventEmitter<{ start: string; end: string }>();

	form: FormGroup;

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			start: [''],
			end: ['']
		});
	}

	submit(): void {
		if (this.form.valid) {
			this.submitted.emit(this.form.value);
		}
	}
}
