import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-happy-clients',
  imports: [CommonModule],
  templateUrl: './happy-clients.component.html',
  styleUrl: './happy-clients.component.scss'
})
export class HappyClientsComponent {
  public clientNames: string[] = ['MP','MP','MP','MP','MP','MP','MP','MP','MP'];
  itemWidth: number = 100;
  trackPosition: number = 0;
  scrollSpeed: number = 1;
  intervalId: any;

  ngOnInit() {
    this.cloneClients();
    this.startCarousel();
  }

  public cloneClients() {
    if (this.clientNames.length <10) {
      this.clientNames = [...this.clientNames, ...this.clientNames]
    }
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.trackPosition -= this.scrollSpeed;
  
      const maxScroll = this.clientNames.length * this.itemWidth;
  
      if (Math.abs(this.trackPosition) >= maxScroll) {
        // Reset position without visible jump
        this.trackPosition = 0;
      }
    }, 20);
  }

  stopCarousel() {
    clearInterval(this.intervalId);
  }
}
