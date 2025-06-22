import { Component } from '@angular/core';
import { SectionIntroComponent } from '../../common/section-intro/section-intro.component';
import { ImageCompareModule } from 'primeng/imagecompare';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-visual-transformation',
  imports: [SectionIntroComponent, ImageCompareModule, CarouselModule],
  templateUrl: './visual-transformation.component.html',
  styleUrl: './visual-transformation.component.scss',
})
export class VisualTransformationComponent {
  public sectionIntroPrimaryText = 'Transforming Raw';
  public sectionIntroSecondaryText = 'Into Remarkable';
  public sectionIntroDescription =
    "It's not just how we shoot — it's how we elevate. See how our team transforms ordinary visuals into glamorous, cinematic masterpieces through expert color grading, editing, and storytelling finesse.";
  public transformations = [
    {
      after: 'assets/images/After_1.jpg',
      before: 'assets/images/Before_1.jpg',
    },
    {
      after: 'assets/images/After_2.jpg',
      before: 'assets/images/Before_2.jpg',
    },
    {
      after: 'assets/images/After_3.jpg',
      before: 'assets/images/Before_3.jpg',
    },
    {
      after: 'assets/images/After_4.jpg',
      before: 'assets/images/Before_4.jpg',
    },
  ];
}
