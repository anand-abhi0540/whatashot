import { Component } from '@angular/core';
import { SectionIntroComponent } from '../../common/section-intro/section-intro.component';
import { WasButtonComponent } from '../../common/was-button/was-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [CommonModule, SectionIntroComponent, WasButtonComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  public sectionIntroPrimaryText = 'WHY CHOOSE';
  public sectionIntroSecondaryText = 'WHAT A SHOT';
  public sectionIntroDescription =
    'With unmatched creativity, technical expertise, and a commitment to quality, What A Shot delivers compelling visuals that elevate your message and engage your audience like never before.';
  public services = [
    {
      "serviceName": "Product Shoot",
      "serviceResource": "../../../../assets/videos/perfume.mp4",
      "serviceDetails": "Professional product videos that highlight every detail and enhance your brand’s appeal."
    },
    {
      "serviceName": "Model Shoots",
      "serviceResource": "../../../../assets/videos/model.mp4",
      "serviceDetails": "Creative and dynamic model shoots that showcase style and personality."
    },
    {
      "serviceName": "UGC Content",
      "serviceResource": "../../../../assets/videos/ugc.mp4",
      "serviceDetails": "Authentic user-generated content to boost engagement and trust."
    },
    {
      "serviceName": "NGO/CSR Stories",
      "serviceResource": "../../../../assets/videos/productshoot.mp4",
      "serviceDetails": "Compelling stories that spotlight social impact and community efforts."
    }
  ];  
}
