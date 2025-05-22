import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, FormsModule],
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
