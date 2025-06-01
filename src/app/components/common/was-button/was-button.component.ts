import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-was-button',
  imports: [CommonModule],
    templateUrl: './was-button.component.html',
  styleUrl: './was-button.component.scss'
})
export class WasButtonComponent {
  @Input() buttonText: string = "";
  @Input() customClass: string = "";
  @Input() buttonHref: string = "";
  @Input() buttonType: string = "";
  @Output() clicked = new EventEmitter();

  public onClick(event: Event) {
    if (!this.buttonHref) {
      event.preventDefault();
      this.clicked.emit();
    }
  }
}
 