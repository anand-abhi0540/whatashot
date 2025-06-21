import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from 'primeng/breadcrumb';

@Component({
  selector: 'app-was-breadcrumb',
  imports: [CommonModule, Breadcrumb, RouterModule],
  templateUrl: './was-breadcrumb.component.html',
  styleUrl: './was-breadcrumb.component.scss'
})
export class WasBreadcrumbComponent {
@Input() breadcrumbs: any[] = [];
ngOnInit() {
  console.log(this.breadcrumbs, "bread");
  
}
}
