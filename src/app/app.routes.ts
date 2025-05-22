import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UnderConstructionComponent } from './components/common/under-construction/under-construction.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

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
];
