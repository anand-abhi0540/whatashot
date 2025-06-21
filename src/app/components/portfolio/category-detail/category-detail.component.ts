import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Category } from '../../../model/category';
import { WasBreadcrumbComponent } from '../../common/was-breadcrumb/was-breadcrumb.component';
import { CommonService } from '../../../services/common.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-category-detail',
  imports: [CommonModule, WasBreadcrumbComponent],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
})
export class CategoryDetailComponent {
  @Input() data: Category[] = [];
  @Output() itemSelected = new EventEmitter();
  items: Category[] = [];
  breadcrumbs: any[] = [{ icon: 'pi pi-home', url: '/' }];
  isFromRoute: boolean = false;
  routeType: string = '';
  routeId: string = '';
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(
      ([params, queryParam]) => {
        this.routeType = params.get('categoryType') || '';
        this.routeId = params.get('categoryId') || '';
        let services: string[] = [];
        if (this.routeType && this.routeId) {
          this.http
            .get<any>('assets/data/categories.json')
            .subscribe((data) => {
              const categoryItems = data[this.routeType];
              services = categoryItems.find(
                (item: any) => item.id === this.routeId
              ).services;
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
            });
        }
        if (this.routeType) {
          this.breadcrumbs.push({
            label: this.commonService.formatTextFromSnakeCase(this.routeType),
            url: `/portfolio?categoryType=${this.routeType}`,
          });
        }

        if (this.routeId) {
          this.breadcrumbs.push({
            label: this.commonService.formatTextFromSnakeCase(this.routeId),
            url: '',
          });
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
