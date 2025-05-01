import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-was-button',
  imports: [CommonModule],
    templateUrl: './was-button.component.html',
  styleUrl: './was-button.component.scss'
})
export class WasButtonComponent {
  @Input() buttonText: string = "";
  @Input() customClass: string = "";

}
 