import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}
  public selectedCategory = new BehaviorSubject<string>('brands');

  formatTextFromSnakeCase(text: string) {
    return text.split('_').join(' ').toUpperCase();
  }
}
