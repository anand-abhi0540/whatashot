import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { SectionIntroComponent } from '../../common/section-intro/section-intro.component';
import { WasButtonComponent } from '../../common/was-button/was-button.component';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { WasCarouselComponent } from '../../common/was-carousel/was-carousel.component';
import { EXT_ASSETS_BASE_URL } from '../../../constants/common';

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
  @ViewChildren('videoEl') videoElements!: QueryList<ElementRef<HTMLVideoElement>>;
  public sectionIntroPrimaryText = 'WHY CHOOSE';
  public sectionIntroSecondaryText = 'WHAT A SHOT';
  public currentSlide = 0;
  public sectionIntroDescription =
    'We turn ideas into striking visuals that captivate and resonate. Through bold creativity and precision, we deliver visuals that leave a lasting impression.';
  public services = [
    {
      serviceName: 'Product Shoot',
      serviceResource: `${EXT_ASSETS_BASE_URL}brands/Hue&Shades-Beauty_and_Personal_Care-Organic/Videos/Hue&Shades_Kumkumadi_Oil-1.mp4`,
      serviceDetails:
        'Professional product videos that highlight every detail and enhance your brand’s appeal.',
    },
    {
      serviceName: 'Model Shoots',
      serviceResource: '../../../../../assets/videos/Model.mp4',
      serviceDetails:
        'Creative and dynamic model shoots that showcase style and personality.',
    },
    {
      serviceName: 'UGC Content',
      serviceResource:`${EXT_ASSETS_BASE_URL}brands/Aviva_Beauty-Beauty_and_Personal_Care-Clinical:Luxury/UGC/UGC_Aviva_Mosturiser.mp4`,
      serviceDetails:
        'Authentic user-generated content to boost engagement and trust.',
    },
    {
      serviceName: 'NGO/CSR Stories',
      serviceResource: `${EXT_ASSETS_BASE_URL}ngo/GoodYear-Ngo_CSR/Videos/Goodyear_India_Solar_Panel_Installation.mp4`,
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

  ngAfterViewInit() {
    this.videoElements.forEach((videoRef) => {
      const video = videoRef.nativeElement;
      video.muted = true;      // enforce muted
      video.autoplay = true;   // ensure autoplay is enabled
      video.play().catch((e) => console.warn('Autoplay failed', e));
    });
  }

  trackByFn(index: number, item: any) {
    return item.serviceResource;
  }
}
