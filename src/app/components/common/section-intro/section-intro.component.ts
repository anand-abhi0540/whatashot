import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-intro',
  imports: [],
  templateUrl: './section-intro.component.html',
  styleUrl: './section-intro.component.scss',
})
export class SectionIntroComponent {
  @Input() primaryText: string = '';
  @Input() secondaryText: string = '';
  @Input() tertiaryText: string = '';
  @Input() description: string = '';
}
