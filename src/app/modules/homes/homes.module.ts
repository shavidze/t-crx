import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomesRoutingModule } from './homes-routing.module';
import { HomesComponent } from './pages/homes/homes.component';
import { HomeDetailsComponent } from './pages/home-details/home-details.component';

import { HomesEffects } from './store/effects/homes.effects';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
//Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



export const MATERIAL_IMPORTS = [
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [HomesComponent, HomeDetailsComponent],
  imports: [
    CommonModule,
    HomesRoutingModule,
    StoreModule.forFeature('homes', reducers),
    EffectsModule.forFeature([HomesEffects]),
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS
  ],
})
export class HomesModule {}
