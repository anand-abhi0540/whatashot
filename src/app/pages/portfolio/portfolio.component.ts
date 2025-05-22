import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, FormsModule, MatFormFieldModule,
    MatSelectModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  selectedCategory: string = 'brand';

  ngOnInit() {
    this.categorize(this.selectedCategory);
  }

  public categorize(selectedCategory: string) {
    console.log(selectedCategory);
  }
}
