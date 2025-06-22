import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { SectionIntroComponent } from '../../common/section-intro/section-intro.component';
import { WasButtonComponent } from '../../common/was-button/was-button.component';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { EXT_ASSETS_BASE_URL } from '../../../constants/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-services',
  imports: [
    CommonModule,
    SectionIntroComponent,
    WasButtonComponent,
    SafeUrlPipe,
    CarouselModule,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  getSeverity(arg0: any) {
    throw new Error('Method not implemented.');
  }
  @ViewChildren('videoEl') videoElements!: QueryList<
    ElementRef<HTMLVideoElement>
  >;
  public sectionIntroPrimaryText = 'WHY CHOOSE';
  public sectionIntroSecondaryText = 'WHAT A SHOT';
  public sectionIntroTertiaryText = 'For Your Video Production Needs';
  public sectionIntroDescription = '<div class="bm-1"><span class="bold">🎥 Creative Vision </span>– We don’t just shoot; we craft visual stories that move people.</div><div class="bm-1"> <span class="bold"> 📸 Top-Quality Gear & Team </span>– Professional-grade cameras, lighting, and editing for flawless results.</div> <div class="bm-1"><span class="bold">📈 Impact-Driven Results </span> – From engagement to conversions, our videos drive real outcomes.</div><div class="bm-1"><span class="bold">🌍 Versatile Portfolio </span> – From startups to corporates, NGOs to personal brands—our work spans industries.</div>';

  // public sectionIntroDescription =
  //   '<span class="bm-1"><span class="bold bm-1">🎥 Creative Vision </span>– We don’t just shoot; we craft visual stories that move people.</span><br><span class="bm-1"> <span class="bold"> 📸 Top-Quality Gear & Team </span>– Professional-grade cameras, lighting, and editing for flawless results.</span><br> <span class="bm-1"><span class="bold">📈 Impact-Driven Results </span> – From engagement to conversions, our videos drive real outcomes.</span><br><span class="bm-1"><span class="bold">🌍 Versatile Portfolio </span> – From startups to corporates, NGOs to personal brands—our work spans industries.</span>';
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
      serviceResource: `${EXT_ASSETS_BASE_URL}brands/Aviva_Beauty-Beauty_and_Personal_Care-Clinical:Luxury/UGC/UGC_Aviva_Mosturiser.mp4`,
      serviceDetails:
        'Authentic user-generated content to boost engagement and trust.',
    },
    {
      serviceName: 'NGO/CSR Stories',
      serviceResource: `${EXT_ASSETS_BASE_URL}ngo/GoodYear-Ngo_CSR/Videos/Goodyear_India_Solar_Panel_Installation.mp4`,
      serviceDetails:
        'Compelling stories that spotlight social impact and community efforts.',
    },
  ];
  public responsiveOptions: any[] = [];

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  ngAfterViewInit() {
    this.videoElements.forEach((videoRef) => {
      const video = videoRef.nativeElement;
      video.muted = true; // enforce muted
      video.autoplay = true; // ensure autoplay is enabled
      video.play().catch((e) => console.warn('Autoplay failed', e));
    });
  }

  trackByFn(index: number, item: any) {
    return item.serviceResource;
  }
}
