import { Component } from '@angular/core';
import { SectionIntroComponent } from '../../common/section-intro/section-intro.component';
import { WasButtonComponent } from '../../common/was-button/was-button.component';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { WasCarouselComponent } from '../../common/was-carousel/was-carousel.component';

@Component({
  selector: 'app-services',
  imports: [
    CommonModule,
    SectionIntroComponent,
    WasButtonComponent,
    SafeUrlPipe,
    WasCarouselComponent,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  public sectionIntroPrimaryText = 'WHY CHOOSE';
  public sectionIntroSecondaryText = 'WHAT A SHOT';
  public currentSlide = 0;
  public sectionIntroDescription =
    'We turn ideas into striking visuals that captivate and resonate. Through bold creativity and precision, we deliver visuals that leave a lasting impression.';
  public services = [
    {
      serviceName: 'Product Shoot',
      serviceResource:
        'https://youtube.com/embed/-znWp3SqZyY?autoplay=1&loop=1&mute=1&rel=0&showinfo=0&modestbranding=1&controls=0',
      serviceDetails:
        'Professional product videos that highlight every detail and enhance your brand’s appeal.',
    },
    {
      serviceName: 'Model Shoots',
      serviceResource:
        'https://youtube.com/embed/4m4v09UHhsA?autoplay=1&loop=1&mute=1&rel=0&showinfo=0&modestbranding=1&controls=0',
      serviceDetails:
        'Creative and dynamic model shoots that showcase style and personality.',
    },
    {
      serviceName: 'UGC Content',
      serviceResource:
        'https://youtube.com/embed/SqRetV3QlIQ?autoplay=1&loop=1&mute=1&rel=0&showinfo=0&modestbranding=1&controls=0',
      serviceDetails:
        'Authentic user-generated content to boost engagement and trust.',
    },
    {
      serviceName: 'NGO/CSR Stories',
      serviceResource: 'https://youtube.com/embed/YNJ9CSOGIt4?autoplay=1&loop=1&mute=1&rel=0&showinfo=0&modestbranding=1&controls=0',
      serviceDetails:
        'Compelling stories that spotlight social impact and community efforts.',
    }
  ];

  public changeSlide(action: string) {
    this.currentSlide =
      action === 'prev'
        ? (this.currentSlide - 1 + this.services.length) % this.services.length
        : (this.currentSlide + 1) % this.services.length;
  }
}
