import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { EXT_ASSETS_BASE_URL } from '../../../constants/common';

@Component({
  selector: 'app-media-list',
  imports: [CommonModule, MatProgressSpinner],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss',
})
export class MediaListComponent {
  categoryType: string = '';
  categoryId: string = '';
  serviceId: string = '';
  isAnyLoading: boolean = true;
  media: any[] = [];
  imagePreviewUrl = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.categoryType = params.get('categoryType') || '';
      this.categoryId = params.get('categoryId') || '';
      this.serviceId = params.get('serviceId') || '';

      if (this.categoryType && this.categoryId && this.serviceId) {
        this.http
          .get<any[]>(`${EXT_ASSETS_BASE_URL}/assets.json`)
          .subscribe(async (data) => {
            this.media = data.filter((item) => {
              // Your filtering logic, updating item.url
              const catId = this.categoryId.split('_').join(' ').toLowerCase();
              const srvId = this.serviceId.split('_').join(' ').toLowerCase();

              item.url = `${EXT_ASSETS_BASE_URL}${item.url}`;
              if (!this.isImage()) {
                item.showVideo = false;
                item.thumbnail = `${EXT_ASSETS_BASE_URL}${item.thumbnail}`;
              }
              if (this.categoryType === 'brands') {
                return (
                  item.brand.toLowerCase() === catId &&
                  item.service_type.toLowerCase() === srvId
                );
              } else if (this.categoryType === 'industries') {
                return (
                  item.sector.toLowerCase() === catId &&
                  item.service_type.toLowerCase() === srvId
                );
              } else {
                return item.service_type.toLowerCase() === srvId;
              }
            });
            this.isAnyLoading = false;
            // Now that media is set, wait for thumbnails:
            // await this.loadMediaThumbnails();
          });
      }
    });
  }

  isImage(): boolean {
    return (
      this.serviceId.includes('images') || this.serviceId.includes('model')
    );
  }

  showVideo(item: any): void {
    item.showVideo = true;
  }

  imagePreview(event: Event | null, url: string) {
    if (event) {
      event.stopPropagation(); // Prevent modal from closing only for specific targets
    }
    this.imagePreviewUrl = url;
  }
}
