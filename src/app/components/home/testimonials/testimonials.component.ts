import { Component } from '@angular/core';
import { SectionIntroComponent } from '../../common/section-intro/section-intro.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, SectionIntroComponent, CarouselModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
  [x: string]: any;
  public sectionIntroPrimaryText = 'RAW REVIEWS';
  public sectionIntroSecondaryText = 'REAL RESULTS';
  public currentSlide = 0;
  public sectionIntroDescription = 'Don’t just take our word for it.<br>Explore the honest feedback from our clients who’ve trusted What A Shot for everything from product shoots to documentary storytelling. Our videos don’t just look good—they work.Let their words show you the impact we bring.';
  public testimonials = [
    {
      clientName: 'Vanshika Chachra',
      brandName: 'Aviva Beauty',
      feedback:
        'Tbh, I was a bit hesitant at first since it was my first time investing a significant amount in a product photoshoot. But the results speak for themselves, the photos look incredibly professional, and I’m genuinely happy with how everything turned out. I liked your professionalism and how you pay attention to the details and discuss each & everything before executing. Your work shows its value and I would definitely be recommending you guys to others.',
      imgUrl: 'AV_solid.jpg',
    },
    {
      clientName: 'Nitish Dixit',
      brandName: 'Perito Morno',
      feedback:
        'We entrusted What a Shot Photography Agency to handle our perfume brand’s visual identity. Initially, we were skeptical, given past challenges with Delhi-based businesses. However, this team exceeded expectations with their sharp execution and unmatched professionalism. They embraced our concept, honed their craft, and incorporated key directives flawlessly. Their laser-focused follow-ups ensured every detail met our high standards, and they delivered on time as promised. The final photographs captured the essence of our brand with precision and artistry. We are thoroughly impressed and would strongly recommend their services to anyone seeking exceptional photography. What a Shot truly delivers results.',
      imgUrl: 'PM_solid.jpg',
    },
    {
      clientName: 'Hashim',
      brandName: 'AR3 Aromas',
      feedback:
        'Sooo, firstly I’d like to thank the team at Whatashot, they cooperated really well. Like in such a short span of time, they delivered such an amazing reel which was quite impossible and was loved by my friends and followers. It was worth the money and I would definitely recommend all other business owners to try #whatashotproductions. It was great working with them.',
      imgUrl: 'AR_solid.jpg',
    },
    {
      clientName: 'Ajay',
      brandName: 'ScoobyCheww',
      feedback:
        "We got 2 videos done by What A Shot for our brand. We contacted various agencies but most of them couldn't arrange a dog. These guys did it amazingly with a very personal touch. Didn't have to explain much and they delivered exactly what we needed. Good job guys! Keep up the good work",
      imgUrl: 'SC_solid.jpg',
    },
    {
      clientName: 'Ashok',
      brandName: 'AirBlue',
      feedback:
        'I had the pleasure of working with the team at What A Shot Productions and I must say, they exceeded all my expectations. The video created was incredibly focused, delivering the exact message we wanted to convey to our customers. They have a knack for producing high-quality videos that align perfectly with the allocated budget. The quality of the video was superb, and it truly captured the essence of our brand. If you’re looking for someone who delivers the right output at the right price, I highly recommend him!',
      imgUrl: 'AB_solid.jpg',
    },
  ];
  public responsiveOptions: any[] = [];

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
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
  public changeSlide(action: string) {
    this.currentSlide =
      action === 'prev'
        ? (this.currentSlide - 1 + this.testimonials.length) %
          this.testimonials.length
        : (this.currentSlide + 1) % this.testimonials.length;
  }
}
