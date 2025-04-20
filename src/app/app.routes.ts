import { Routes } from '@angular/router';
import { ShellComponent } from '@app/core/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@app/features/planner/planner.component').then((m) => m.PlannerComponent)
      }
    ]
  }
];