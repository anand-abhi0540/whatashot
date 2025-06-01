import { Component } from '@angular/core';
import { WasButtonComponent } from '../../common/was-button/was-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, WasButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
