import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
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
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<
    ElementRef<HTMLVideoElement>
  >;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.categoryType = params.get('categoryType') || '';
      this.categoryId = params.get('categoryId') || '';
      this.serviceId = params.get('serviceId') || '';
      this.isAnyLoading = true;
      if (this.categoryType && this.categoryId && this.serviceId) {
        this.http
          .get<any[]>(`${EXT_ASSETS_BASE_URL}/assets.json`)
          .subscribe((data) => {
            this.media = data.filter((item) => {
              const catId = this.categoryId.split('_').join(' ').toLowerCase();
              const srvId = this.serviceId.split('_').join(' ').toLowerCase();

              item.url = `${EXT_ASSETS_BASE_URL}${item.url}`;
              item.showFile = false;
              item.thumbnail = `${EXT_ASSETS_BASE_URL}${item.thumbnail}`;
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
          });
      }
    });
  }

  isImage(): boolean {
    return (
      this.serviceId.includes('images') || this.serviceId.includes('model')
    );
  }

  showFile(selectedItem: any): void {
    if (!this.isImage()) {
      this.media.forEach((item: any) => {
        if (item !== selectedItem && item.showFile) {
          item.showFile = false; // hide video
        }
      });
      this.videoPlayers?.forEach((player) => {
        const videoEl = player.nativeElement;
        videoEl.pause();
        videoEl.currentTime = 0;
      });
    }
    selectedItem.showFile = true;
  }

  imagePreview(event: Event | null, url: string) {
    if (event) {
      event.stopPropagation();
    }
    this.imagePreviewUrl = url;
  }
}
