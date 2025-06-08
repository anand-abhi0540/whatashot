import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-media-list',
  imports: [CommonModule],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss',
})
export class MediaListComponent {
  categoryType: string = '';
  categoryId: string = '';
  serviceId: string = '';
  media: any[] = [];
  imagePreviewUrl = '';
  BASE_URL =
    'https://raw.githubusercontent.com/anand-abhi0540/whatashot-assets/main/';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryType = params.get('categoryType') || '';
      this.categoryId = params.get('categoryId') || '';
      this.serviceId = params.get('serviceId') || '';
      console.log(this.categoryType ,this.categoryId , this.serviceId);
      if (this.categoryType && this.categoryId && this.serviceId) {
        this.http
          .get<any[]>(`${this.BASE_URL}/assets.json`)
          .subscribe((data) => {
            console.log(data);
            this.media = data.filter((item) => {
              if (this.categoryType == 'brands') {
                if (
                  item.brand.toLowerCase() ===
                    this.categoryId.split('_').join(' ') &&
                  item.service_type.toLowerCase() ===
                    this.serviceId.split('_').join(' ')
                ) {
                  item.url = `${this.BASE_URL}${item.url}`;
                  return item;
                }
              } else if (this.categoryType == 'industries') {
                if (
                  item.sector.toLowerCase() ===
                    this.serviceId.split('_').join(' ') &&
                  item.service_type.toLowerCase() ===
                    this.serviceId.split('_').join(' ')
                ) {
                  item.url = `${this.BASE_URL}${item.url}`;
                  return item;
                }
              } else {
                if (
                  item.service_type.toLowerCase() ===
                    this.serviceId.split('_').join(' ')
                ) {
                  item.url = `${this.BASE_URL}${item.url}`;
                  return item;
                }
              }
            });
          });
      }
    });
  }
  imagePreview(event: Event | null, url: string) {
    if (event) {
      event.stopPropagation(); // Prevent modal from closing only for specific targets
    }
    this.imagePreviewUrl = url;
  }
}
