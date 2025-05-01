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
    'Vitae sapien pellentesque habitant morbi tristique senectus et netus et. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Mi sit amet mauris commodo uis imperdiet massa tincidunt nunc. Viverra aliquet eget sit amet tellus. Ornare lectus sit amet est placerat in. Lectus magna fringilla urna porttitor rhoncus vitae.';
}
