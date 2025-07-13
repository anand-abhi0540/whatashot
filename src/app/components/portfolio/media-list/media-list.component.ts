import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EXT_ASSETS_BASE_URL } from '../../../constants/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonService } from '../../../services/common.service';
import { WasBreadcrumbComponent } from '../../common/was-breadcrumb/was-breadcrumb.component';

@Component({
  selector: 'app-media-list',
  imports: [CommonModule, ProgressSpinnerModule, WasBreadcrumbComponent],
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
  breadcrumbs: any[] = [{ icon: 'pi pi-home', url: '/' }];
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<
    ElementRef<HTMLVideoElement>
  >;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private commonService: CommonService
  ) {}

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
            console.log(data);
            this.media = data.filter((item) => {
              const catId = this.commonService.formatTextFromSnakeCase(
                this.categoryId
              );
              const srvId = this.commonService.formatTextFromSnakeCase(
                this.serviceId
              );

              item.url = `${EXT_ASSETS_BASE_URL}${item.url}`;
              item.showFile = false;
              item.thumbnail = `${EXT_ASSETS_BASE_URL}${item.thumbnail}`;
              if (this.categoryType === 'brands') {
                return (
                  item.brand.toUpperCase() === catId &&
                  item.service_type.toUpperCase() === srvId
                );
              } else if (this.categoryType === 'industries') {
                return (
                  item.sector.toUpperCase() === catId &&
                  item.service_type.toUpperCase() === srvId
                );
              } else {
                return item.service_type.toUpperCase() === srvId;
              }
            });
            this.breadcrumbs = [
              ...this.breadcrumbs,
              {
                label: this.commonService.formatTextFromSnakeCase(
                  this.categoryType
                ),
                url: `/portfolio?categoryType=${this.categoryType}`,
              },
              {
                label: this.commonService.formatTextFromSnakeCase(
                  this.categoryId
                ),
                url: this.categoryId == 'all' ? '' : `/portfolio/${this.categoryType}/${this.categoryId}`,
              },
              {
                label: this.commonService.formatTextFromSnakeCase(
                  this.serviceId
                ),
                url: '',
              },
            ];
            this.isAnyLoading = false;
            // this.generateAndDownloadThumbnails();
          });
      }
    });
  }

  isImage(): boolean {
    return (
      this.serviceId.includes('images') || this.serviceId.includes('model') || this.serviceId.includes('infographics')
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

  // Utility
  async generateAndDownloadThumbnails(): Promise<void> {
    for (const item of this.media) {
      const thumbnailDataUrl = await this.generateThumbnail(item.url);
      if (thumbnailDataUrl) {
        const fileName = this.getSafeFileName(item.url);
        this.downloadDataUrlAsFile(thumbnailDataUrl, `${fileName}-thumb.jpg`);
      }
    }
  }
  
  // generateThumbnail(mediaUrl: string): Promise<string> {
  //   return new Promise((resolve) => {
  //     const isVideo = mediaUrl.endsWith('.mp4');
  //     const element = isVideo ? document.createElement('video') : document.createElement('img');
  //     element.crossOrigin = 'anonymous';
  //     element.src = mediaUrl;
  
  //     const handleLoad = () => {
  //       const width = isVideo ? (element as HTMLVideoElement).videoWidth : (element as HTMLImageElement).naturalWidth;
  //       const height = isVideo ? (element as HTMLVideoElement).videoHeight : (element as HTMLImageElement).naturalHeight;
  
  //       const canvas = document.createElement('canvas');
  //       canvas.width = width;
  //       canvas.height = height;
  
  //       const ctx = canvas.getContext('2d');
  //       if (ctx) {
  //         ctx.drawImage(element, 0, 0, width, height);
  //         // Compress using JPEG (quality 0.7 or adjust as needed)
  //         resolve(canvas.toDataURL('image/jpeg', 0.7));
  //       } else {
  //         resolve('');
  //       }
  //     };
  
  //     const handleError = () => resolve('');
  
  //     if (isVideo) {
  //       (element as HTMLVideoElement).addEventListener('loadeddata', () => {
  //         (element as HTMLVideoElement).currentTime = 3;
  //         handleLoad();
  //       });
  //     } else {
  //       element.addEventListener('load', handleLoad);
  //     }
  
  //     element.addEventListener('error', handleError);
  //   });
  // }
  

  generateThumbnail(mediaUrl: string): Promise<string> {
    return new Promise((resolve) => {
      const isVideo = mediaUrl.endsWith('.mp4');
      const element = isVideo ? document.createElement('video') : document.createElement('img');
      element.crossOrigin = 'anonymous';
      element.src = mediaUrl;
  
      const handleError = () => resolve('');
  
      if (isVideo) {
        const video = element as HTMLVideoElement;
        video.addEventListener('loadeddata', () => {
          // Move to a frame at 2 seconds (or later)
          video.currentTime = 2;
        });
  
        video.addEventListener('seeked', () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
  
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.7));
          } else {
            resolve('');
          }
        });
  
        video.addEventListener('error', handleError);
      } else {
        element.addEventListener('load', () => {
          const img = element as HTMLImageElement;
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
  
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.7));
          } else {
            resolve('');
          }
        });
  
        element.addEventListener('error', handleError);
      }
    });
  }
  
  
  downloadDataUrlAsFile(dataUrl: string, fileName: string) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    a.click();
  }
  
  getSafeFileName(url: string): string {
    return url.split('/').pop()?.split('.').shift() || 'thumbnail';
  }
}


