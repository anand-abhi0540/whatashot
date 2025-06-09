import { Component } from '@angular/core';
import { WasButtonComponent } from '../../common/was-button/was-button.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, WasButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(private router: Router) {}

  public menuClicked(clickedMenuItem: string): void {
    console.log(clickedMenuItem);

    this.isMenuOpen = false;
    // if (clickedMenuItem === 'contact-us' || clickedMenuItem === 'quote-section') {
    //   // const el = document.querySelector(`#${clickedMenuItem}`);
    //   // if (el) {
    //   //   (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    //   // }
    // } else {
    // }
    this.router.navigate([clickedMenuItem]);
  }
}
