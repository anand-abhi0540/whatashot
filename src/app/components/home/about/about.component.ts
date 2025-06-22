import { Component } from '@angular/core';
import { WasButtonComponent } from '../../common/was-button/was-button.component';
import { SectionIntroComponent } from '../../common/section-intro/section-intro.component';

@Component({
  selector: 'app-about',
  imports: [WasButtonComponent, SectionIntroComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  public sectionIntroPrimaryText = 'INTRODUCTION';
  public sectionIntroSecondaryText = 'TO WHAT A SHOT';
  public sectionIntroTertiaryText = 'A Creative Video Production Company';
  public sectionIntroDescription =
    "Looking for the best video production team to tell your story? At What A Shot, every frame is a canvas. We create compelling videos for brands, startups, NGOs, and businesses, using visuals that resonate deeply with your audience. Whether you're launching a product, telling a CSR story, or need a professional corporate video, we’re here to elevate your vision.";
}
