import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UnderConstructionComponent } from './components/common/under-construction/under-construction.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { CategoryDetailComponent } from './components/portfolio/category-detail/category-detail.component';
import { MediaListComponent } from './components/portfolio/media-list/media-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: UnderConstructionComponent,
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
  },
  {
    path: 'services',
    component: UnderConstructionComponent,
  },
  {
    path: 'portfolio/:categoryType/:categoryId',
    component: CategoryDetailComponent
  },
  {
    path: 'portfolio/:categoryType/:categoryId/:serviceId',
    component: MediaListComponent
  }
];
