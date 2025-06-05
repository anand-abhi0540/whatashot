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
  routeType: string = '';
  routeId: string = '';
  serviceId: string = '';
  media: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.routeType = params.get('categoryType') || '';
      this.routeId = params.get('categoryId') || '';
      this.serviceId = params.get('serviceId') || '';
      if (this.routeType && this.routeId && this.serviceId) {
        this.http
          .get<any[]>(
            'https://raw.githubusercontent.com/anand-abhi0540/whatashot-assets/main/brands/assets.json'
          )
          .subscribe((data) => {
            console.log(data);
            this.media = data.filter(
              (item) =>
                item.brand.toLowerCase() ===
                  this.routeId.split('_').join(' ') &&
                item.service_type.toLowerCase() ===
                  this.serviceId.split('_').join(' ')
            );
            console.log(this.media);
            
          });
      }
    });
  }
  getMediaUrl(asset: any): string {
    const base = 'https://raw.githubusercontent.com/your-username/media-repo/main/brands/';
    const brandPart = asset.brand.replace(/ /g, '_');
    const sectorPart = asset.sector?.replace(/ /g, '_') || '';
    const themePart = asset.theme?.replace(/ /g, '_') || '';
    const folderName = [brandPart, sectorPart, themePart].filter(Boolean).join('-');
    const serviceFolder = asset.service_type.replace(/ /g, '_');
    const filename = encodeURIComponent(asset.filename); // handles special characters
  
    return `${base}${folderName}/${serviceFolder}/${filename}`;
  }
}
