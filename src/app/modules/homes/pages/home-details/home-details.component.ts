import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemModel } from '@core/models/item.model';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetHomeItem } from '../../store/actions/homes.actions';
import * as fromHomes from '../../store/reducers';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss'],
})
export class HomeDetailsComponent implements OnInit {
  homeItem: ItemModel;
  
  private destruct$ = new Subject();
  
  constructor(
    private store :Store<fromHomes.State>
  ) {

  }

  ngOnInit(): void {
    this.getHome();
  }

  private getHome() {
    this.store.dispatch(new GetHomeItem())
    this.store.pipe(
      takeUntil(this.destruct$),
      select(fromHomes.homes.item),
    ).subscribe(item => {
      this.homeItem = item;
    })
  }

}
