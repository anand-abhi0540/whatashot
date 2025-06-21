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
