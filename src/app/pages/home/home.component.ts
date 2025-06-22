import { Component } from '@angular/core';
import { ContactBannerComponent } from "../../components/home/contact-banner/contact-banner.component";
import { AboutComponent } from "../../components/home/about/about.component";
import { IntroComponent } from '../../components/home/intro/intro.component';
import { ServicesComponent } from "../../components/home/services/services.component";
import { HappyClientsComponent } from "../../components/common/happy-clients/happy-clients.component";
import { ContactFormComponent } from "../../components/common/contact-form/contact-form.component";
import { TestimonialsComponent } from "../../components/home/testimonials/testimonials.component";
import { HeaderComponent } from '../../components/common/header/header.component';
import { VisualTransformationComponent } from "../../components/home/visual-transformation/visual-transformation.component";

@Component({
  selector: 'app-home',
  imports: [IntroComponent, ContactBannerComponent, AboutComponent, ServicesComponent, HappyClientsComponent, ContactFormComponent, TestimonialsComponent, VisualTransformationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
