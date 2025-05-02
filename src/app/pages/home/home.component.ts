import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/home/header/header.component";
import { ContactBannerComponent } from "../../components/home/contact-banner/contact-banner.component";
import { AboutComponent } from "../../components/home/about/about.component";
import { IntroComponent } from '../../components/home/intro/intro.component';
import { ServicesComponent } from "../../components/home/services/services.component";
import { HappyClientsComponent } from "../../components/common/happy-clients/happy-clients.component";
import { ContactFormComponent } from "../../components/common/contact-form/contact-form.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, IntroComponent, ContactBannerComponent, AboutComponent, ServicesComponent, HappyClientsComponent, ContactFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
