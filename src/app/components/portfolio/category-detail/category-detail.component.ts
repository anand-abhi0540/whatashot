import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Category } from '../../../model/category';

@Component({
  selector: 'app-category-detail',
  imports: [CommonModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
})
export class CategoryDetailComponent {
  @Input() data: Category[] = [];
  @Output() itemSelected = new EventEmitter();
  items: Category[] = [];
  isFromRoute: boolean = false;
  routeType: string = '';
  routeId: string = '';
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(
      ([params, queryParam]) => {
        this.routeType = params.get('categoryType') || '';
        this.routeId = params.get('categoryId') || '';
        const services = queryParam?.get('services')?.split(',') || [];

        if (this.routeType && this.routeId && services) {
          this.items = [];
          services.forEach((service) => {
            this.items.push({
              name: service,
              id: service.toLowerCase().replace(/\s+/g, '_'),
            });
          });
          this.isFromRoute = true;
        } else {
          this.isFromRoute = false;
          this.items = this.data;
        }
      }
    );
  }

  ngOnChanges(): void {
    this.items = [...this.data];
  }
  public onClick(id: string) {
    this.isFromRoute
      ? this.router.navigate(['/portfolio', this.routeType, this.routeId, id])
      : this.itemSelected.emit(id);
  }
  public trackById(index: number, item: { id: string }): string {
    return item.id;
  }
}
