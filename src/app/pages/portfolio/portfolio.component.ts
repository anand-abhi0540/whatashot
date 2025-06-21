import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryDetailComponent } from '../../components/portfolio/category-detail/category-detail.component';
import { Category } from '../../model/category';
import { ToastService } from '../../services/toast.service';
import { CommonService } from '../../services/common.service';
import { SelectModule } from 'primeng/select';
import { WasBreadcrumbComponent } from '../../components/common/was-breadcrumb/was-breadcrumb.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  imports: [
    CommonModule,
    FormsModule,
    CategoryDetailComponent,
    SelectModule,
    WasBreadcrumbComponent,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  categories: any;
  selectedCategories: Category[] = [];
  selectedCategoryType = '';
  paramType = '';
  categoryTypes: any[] = [
    { label: 'Brands', value: 'brands' },
    { label: 'Services', value: 'services' },
    { label: 'Industry', value: 'industries' },
  ];
  breadcrumbs: any[] = [
    { icon: 'pi pi-home', url: '/' },
    {
      label: 'PORTFOLIO',
      url: `/portfolio?categoryType=brands`,
    },
  ];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private commonService: CommonService
  ) {}

  // ngOnInit() {
  //   this.http.get<any>('assets/data/categories.json').subscribe((data) => {
  //     this.categories = data;

  //     this.route.queryParamMap.subscribe((queryParams) => {
  //       this.paramType = queryParams.get('categoryType') || 'brands';
  //       this.selectedCategoryType = this.paramType;
  //       this.updateCategoryList(this.paramType);
  //       this.breadcrumbs.push({
  //         label: this.paramType,
  //         route: `/portfolio?categoryType=${this.paramType}`,
  //       });
  //     });
  //   });
  // }

  ngOnInit() {
    const category$ = this.http.get<any>('assets/data/categories.json');
    const queryParams$ = this.route.queryParamMap;
  
    combineLatest([category$, queryParams$]).subscribe(([data, queryParams]) => {
      this.categories = data;
      this.paramType = queryParams.get('categoryType') || 'brands';
      this.selectedCategoryType = this.paramType;
      this.updateCategoryList(this.paramType);
  
      this.breadcrumbs = [
        { icon: 'pi pi-home', url: '/' },
        { label: 'PORTFOLIO', url: '/portfolio' },
        {
          label: this.commonService.formatTextFromSnakeCase(this.paramType),
          route: `/portfolio?categoryType=${this.paramType}`,
        },
      ];
    });
  }
  

  updateCategoryList(categoryType: string) {
    if (!this.categories) return;
    this.selectedCategories = this.categories[categoryType] || [];
  }

  categorize() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categoryType: this.selectedCategoryType },
      queryParamsHandling: 'merge',
    });
    this.updateCategoryList(this.selectedCategoryType);
  }

  public itemSelection(id: string) {
    let selectedItem: Category | undefined;
    if (this.selectedCategoryType !== 'services') {
      selectedItem = this.selectedCategories.find(
        (category) => category.id === id
      );

      if (selectedItem) {
        const services = selectedItem.services?.join(',') || '';
        this.router.navigate(['/portfolio', this.selectedCategoryType, id]);
      } else {
        this.toast.error('Something went wrong. Please try again later !');
      }
    } else {
      this.router.navigate([
        '/portfolio',
        this.selectedCategoryType,
        'all',
        id,
      ]);
    }
  }
}
