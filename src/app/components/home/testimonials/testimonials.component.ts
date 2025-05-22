import { Component } from '@angular/core';
import { SectionIntroComponent } from "../../common/section-intro/section-intro.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, SectionIntroComponent],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  public sectionIntroPrimaryText = 'RAW REVIEWS';
  public sectionIntroSecondaryText = 'REAL RESULTS';
  public sectionIntroDescription =
    'Vitae sapien pellentesque habitant morbi tristique senectus et netus et. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Mi sit amet mauris commodo uis imperdiet massa tincidunt nunc. Viverra aliquet eget sit amet tellus. Ornare lectus sit amet est placerat in. Lectus magna fringilla urna porttitor rhoncus vitae.';
  public testimonials = [
    {
      clientName: 'Vanshika Chachra',
      brandName: 'Aviva Beauty',
      feedback: 'Great Work, loved it',
      imgUrl: 'AV_solid.jpg'
    },
    {
      clientName: 'Nitish Dixit',
      brandName: 'Perito Morno',
      feedback: 'Great Work, loved it',
      imgUrl: 'PM_solid.jpg'
    },
    {
      clientName: 'Hashim',
      brandName: 'AR3 Aromas',
      feedback: 'Great Work, loved it',
      imgUrl: 'AR_solid.jpg'
    },
    {
      clientName: 'Ajay',
      brandName: 'ScoobyCheww',
      feedback: 'Great Work, loved it',
      imgUrl: 'SC_solid.jpg'
    },
  ];
}
