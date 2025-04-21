import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.less']
})
export class DrawerComponent {
  @Input() opened = true;
  @Input() title = '';
  @Input() closeable = true;
  @Output() closed = new EventEmitter<void>();

  @ViewChild('drawer') drawer!: MatSidenav;

  open() {
    this.drawer.open();
  }

  close() {
    this.drawer.close();
    this.closed.emit();
  }
}
