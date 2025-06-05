import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CategoryDetailComponent } from '../../components/portfolio/category-detail/category-detail.component';
import { Category } from '../../model/category';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-portfolio',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    CategoryDetailComponent,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  categories: any;
  selectedCategories: Category[] = [];
  selectedCategoryType: string = 'brands';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.http.get<any>('assets/data/categories.json').subscribe((data) => {
      this.categories = data;
      this.categorize();
    });
  }

  public categorize() {
    if (!this.categories) return;
    this.selectedCategories = this.categories[this.selectedCategoryType];
  }
  public itemSelection(id: string) {
    let selectedItem: Category | undefined;
    if (this.selectedCategoryType !== 'services') {
      selectedItem = this.selectedCategories.find(
        (category) => category.id === id
      );

      if (selectedItem) {
        const services = selectedItem.services?.join(',') || '';
        this.router.navigate(['/portfolio', this.selectedCategoryType, id], {
          queryParams: { services },
        });
      } else {
        this.toast.error('Something went wrong. Please try again later !');
      }
    } else {
      this.router.navigate(['/portfolio', this.selectedCategoryType, id]);
    }
  }
}
