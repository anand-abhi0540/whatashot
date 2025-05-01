import { Component } from '@angular/core';
import { SectionIntroComponent } from "../../common/section-intro/section-intro.component";
import { WasButtonComponent } from "../../common/was-button/was-button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [CommonModule, SectionIntroComponent, WasButtonComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  public sectionIntroPrimaryText = 'WHY CHOOSE';
  public sectionIntroSecondaryText = 'WHAT A SHOT';
  public sectionIntroDescription =
    'Vitae sapien pellentesque habitant morbi tristique senectus et netus et. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Mi sit amet mauris commodo uis imperdiet massa tincidunt nunc. Viverra aliquet eget sit amet tellus. Ornare lectus sit amet est placerat in. Lectus magna fringilla urna porttitor rhoncus vitae.';
  public services = [{
    serviceName : 'Product Shoot',
    serviceResource: '../../../../assets/videos/perfume.mp4',
    serviceDetails: 'Lorem Ipsum morbi tristique senectus et netus et. Feugiat nibh sed pulvinar proin gravida.Vitae sapien pellentesque habitant morbi tristique senectus et netus et. '
  },
  {
    serviceName : 'Model Shoots',
    serviceResource: '../../../../assets/videos/model.mp4',
    serviceDetails: 'Lorem Ipsum morbi tristique senectus et netus et. Feugiat nibh sed pulvinar proin gravida.Vitae sapien pellentesque habitant morbi tristique senectus et netus et. '
  },
  {
    serviceName : 'UGC Content',
    serviceResource: '../../../../assets/videos/ugc.mp4',
    serviceDetails: 'Lorem Ipsum morbi tristique senectus et netus et. Feugiat nibh sed pulvinar proin gravida.Vitae sapien pellentesque habitant morbi tristique senectus et netus et. '
  },
  {
    serviceName : 'NGO/CSR Stories',
    serviceResource: '../../../../assets/videos/productshoot.mp4',
    serviceDetails: 'Lorem Ipsum morbi tristique senectus et netus et. Feugiat nibh sed pulvinar proin gravida.Vitae sapien pellentesque habitant morbi tristique senectus et netus et. '
  }
];
  }
