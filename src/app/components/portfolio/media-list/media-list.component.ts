import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

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
  BASE_URL =
    'https://raw.githubusercontent.com/anand-abhi0540/whatashot-assets/main/';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  // async ngOnInit() {
  //   this.route.paramMap.subscribe((params) => {
  //     this.categoryType = params.get('categoryType') || '';
  //     this.categoryId = params.get('categoryId') || '';
  //     this.serviceId = params.get('serviceId') || '';
  //     console.log(this.categoryType, this.categoryId, this.serviceId);
  //     if (this.categoryType && this.categoryId && this.serviceId) {
  //       this.http
  //         .get<any[]>(`${this.BASE_URL}/assets.json`)
  //         .subscribe((data) => {
  //           console.log(data);
  //           this.media = data.filter((item) => {
  //             if (this.categoryType == 'brands') {
  //               if (
  //                 item.brand.toLowerCase() ===
  //                   this.categoryId.split('_').join(' ') &&
  //                 item.service_type.toLowerCase() ===
  //                   this.serviceId.split('_').join(' ')
  //               ) {
  //                 item.url = `${this.BASE_URL}${item.url}`;
  //                 return item;
  //               }
  //             } else if (this.categoryType == 'industries') {
  //               if (
  //                 item.sector.toLowerCase() ===
  //                   this.serviceId.split('_').join(' ') &&
  //                 item.service_type.toLowerCase() ===
  //                   this.serviceId.split('_').join(' ')
  //               ) {
  //                 item.url = `${this.BASE_URL}${item.url}`;
  //                 return item;
  //               }
  //             } else {
  //               if (
  //                 item.service_type.toLowerCase() ===
  //                 this.serviceId.split('_').join(' ')
  //               ) {
  //                 item.url = `${this.BASE_URL}${item.url}`;
  //                 return item;
  //               }
  //             }
  //           });
  //           // if (!this.isImage()) {
  //           //   this.media.forEach((item) => {
  //           //     this.generateVideoThumbnail(item.url).then((thumb) => {
  //           //       item.videoThumb = thumb;
  //           //       item.showVideo = false;
  //           //       this.isAnyLoading = false;
  //           //     });
  //           //   });
  //           // }
  //         });
  //     }
  //   });
  //   await this.loadMediaThumbnails();
  // }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.categoryType = params.get('categoryType') || '';
      this.categoryId = params.get('categoryId') || '';
      this.serviceId = params.get('serviceId') || '';

      if (this.categoryType && this.categoryId && this.serviceId) {
        this.http
          .get<any[]>(`${this.BASE_URL}/assets.json`)
          .subscribe(async (data) => {
            this.media = data.filter((item) => {
              // Your filtering logic, updating item.url
              const catId = this.categoryId.split('_').join(' ').toLowerCase();
              const srvId = this.serviceId.split('_').join(' ').toLowerCase();

              item.url = `${this.BASE_URL}${item.url}`;
              if (!this.isImage()) {
                item.showVideo = false;
                item.thumbnail = `${this.BASE_URL}${item.thumbnail}`;
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

  // async loadMediaThumbnails() {
  //   if (!this.isImage()) {
  //     const promises = this.media.map(async (item) => {
  //       item.showVideo = false;
  //       item.videoThumb = await this.generateVideoThumbnail(item.url);
  //     });

  //     await Promise.all(promises);
  //   }
  //   this.isAnyLoading = false;
  // }

  showVideo(item: any): void {
    item.showVideo = true;
  }

  imagePreview(event: Event | null, url: string) {
    if (event) {
      event.stopPropagation(); // Prevent modal from closing only for specific targets
    }
    this.imagePreviewUrl = url;
  }
  // generateVideoThumbnail(url: string): Promise<string> {
  //   return new Promise((resolve) => {
  //     const video = document.createElement('video');
  //     video.src = url;
  //     video.crossOrigin = 'anonymous'; // only if from other domain
  //     video.load();

  //     video.addEventListener('loadeddata', () => {
  //       video.currentTime = 1;
  //     });

  //     video.addEventListener('seeked', () => {
  //       const canvas = document.createElement('canvas');
  //       canvas.width = video.videoWidth;
  //       canvas.height = video.videoHeight;

  //       const ctx = canvas.getContext('2d');
  //       ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
  //       const thumbnail = canvas.toDataURL('image/png');
  //       resolve(thumbnail);
  //     });
  //   });
  // }
  // generateVideoThumbnail(url: string): Promise<string> {
  //   return new Promise((resolve) => {
  //     const video = document.createElement('video');
  //     video.src = url;
  //     video.crossOrigin = 'anonymous'; // allow CORS
  //     video.load();

  //     video.addEventListener('loadeddata', () => {
  //       video.currentTime = 1;
  //     });

  //     video.addEventListener('seeked', () => {
  //       const scaleFactor = 0.3; // Resize to 30%
  //       const canvas = document.createElement('canvas');
  //       canvas.width = video.videoWidth * scaleFactor;
  //       canvas.height = video.videoHeight * scaleFactor;

  //       const ctx = canvas.getContext('2d');
  //       ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

  //       // Use JPEG and reduce quality (0.6 or lower for smaller file)
  //       const thumbnail = canvas.toDataURL('image/jpeg', 0.6);
  //       resolve(thumbnail);
  //     });
  //   });
  // }

  // async loadMediaThumbnails() {
  //   if (!this.isImage()) {
  //     const promises = this.media.map(async (item) => {
  //       item.showVideo = false;

  //       const thumbnailDataUrl = await this.generateVideoThumbnail(item.url);
  //       item.videoThumb = thumbnailDataUrl;

  //       // Generate filename by stripping extension and appending .jpg
  //       const filename = `${item.filename.replace(/\.[^/.]+$/, '')}.jpg`;

  //       // Trigger download
  //       this.downloadThumbnail(thumbnailDataUrl, filename);
  //     });

  //     await Promise.all(promises);
  //   }
  //   this.isAnyLoading = false;
  // }

  // downloadThumbnail(dataUrl: string, filename: string) {
  //   const link = document.createElement('a');
  //   link.href = dataUrl;
  //   link.download = filename;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }
}
