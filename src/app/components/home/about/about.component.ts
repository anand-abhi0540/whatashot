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
  public sectionIntroDescription =
    'At What A Shot, we believe every frame tells a story. Our passion lies in capturing moments that resonate, inspire, and leave lasting impressions.';
}
