import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/common/header/header.component";
import { ToastModule } from 'primeng/toast';
import { SocialSharingComponent } from "./components/common/social-sharing/social-sharing.component";
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, ToastModule, SocialSharingComponent]
})
export class AppComponent {
  title = 'whatashot';
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-KDBM9S9XQS', {
          'page_path': event.urlAfterRedirects,
        });
      }
    });
  }
}
