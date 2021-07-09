import { map, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  GetHomeItem,
  GetHomeItemSuccess,
  GetHomesList,
  GetHomesListSuccess,
  GetSearchOptions,
  GetSearchOptionsSuccess,
  HomesActionTypes,
  LoadMoreHomeList,
  LoadMoreHomeListFailed,
  LoadMoreHomeListSuccess,
} from '../actions/homes.actions';
import { HomesService } from '@core/services/homes.service';

@Injectable()
export class HomesEffects {
  @Effect()
  getHomesList$: Observable<Action> = this.actions$.pipe(
    ofType<GetHomesList>(HomesActionTypes.GetHomesList),
    mergeMap((action: GetHomesList) => {
      return this.homesService.getHomesList({_page:action.payload._page, _limit: action.payload._limit}).pipe(
        map((items) => {
          return new GetHomesListSuccess({ data: items });
        })
      );
    })
  );

  @Effect()
  getSearchOptions$: Observable<Action> = this.actions$.pipe(
    ofType<GetSearchOptions>(HomesActionTypes.GetSearchOptions),
    mergeMap((action: GetSearchOptions) => {
      return this.homesService.getSearchOptions().pipe(
        map((items) => {
          return new GetSearchOptionsSuccess({ data: items });
        })
      );
    })
  );

  @Effect()
  getHomeItem$: Observable<Action> = this.actions$.pipe(
    ofType<GetHomeItem>(HomesActionTypes.GetHomeItem),
    mergeMap((action: GetHomeItem) => {
      return this.homesService.getItem().pipe(
        map((item) => {
          return new GetHomeItemSuccess({ data: item });
        })
      );
    })
  )

  @Effect()
  LoadMoreHomesList$ : Observable<Action> = this.actions$.pipe(
    ofType<LoadMoreHomeList>(HomesActionTypes.LoadMoreHomeList),
    mergeMap((action:LoadMoreHomeList) => {
      return this.homesService.getHomesList({_page:action.payload._page, _limit: action.payload._limit}).pipe(
        map(items => {
          if(items.length === 0){
            return new LoadMoreHomeListFailed();
          } else{
            return new LoadMoreHomeListSuccess({data: items})
          }
        })
      )
    })
  )



  constructor(private actions$: Actions, private homesService: HomesService) {}
}
