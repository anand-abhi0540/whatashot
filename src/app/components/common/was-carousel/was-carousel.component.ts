import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'was-carousel',
  imports: [],
  templateUrl: './was-carousel.component.html',
  styleUrl: './was-carousel.component.scss',
})
export class WasCarouselComponent {
  @Input() currentSlide: number = 0;
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter();

  public onClick(action: string) {
    this.buttonClicked.emit(action);
  }
}
