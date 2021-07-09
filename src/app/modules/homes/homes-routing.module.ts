import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDetailsComponent } from './pages/home-details/home-details.component';
import { HomesComponent } from './pages/homes/homes.component';

const routes: Routes = [
  {
    path: '',
    component: HomesComponent,
  },
  {
    path: ':homeId',
    component: HomeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomesRoutingModule {}
