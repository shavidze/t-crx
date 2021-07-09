import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemModel } from '@core/models/item.model';
import { SearchOptionModel } from '@core/models/search.model';
import { select, Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  merge,
  Observable,
  Subject,
} from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import {
  GetHomesList,
  GetSearchOptions,
  LoadMoreHomeList,
  StartLoading,
} from '../../store/actions/homes.actions';
import * as fromHomes from '../../store/reducers';
@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss'],
})
export class HomesComponent implements OnInit {
  public data$: Observable<any>;
  private destruct$ = new Subject();
  private filter$ = new BehaviorSubject({
    searchKey: '',
  });
  private previousSearchKey: string = '';
  private loadMore$: Subject<void> = new Subject<void>();
  private _pageIndex: number = 1;
  private _itemsPerPage = 8;
  canLoadMore: boolean = true;
  isLoading = false;
  control = new FormControl();
  filteredOptions$: Observable<SearchOptionModel[]>;

  constructor(private store: Store<fromHomes.State>, private route: Router) {}

  ngOnInit(): void {
    this.store.dispatch(
      new GetHomesList({
        _page: String(this._pageIndex),
        _limit: String(this._itemsPerPage),
      })
    );
    this.store.dispatch(new GetSearchOptions());
    this.listenToData();
    this.listeInput();
    this.listenToLoadMore();
    this.listenScrollAndResize();
    this.listenToLoadingAbility();
    this.listenToLoadingStatus();
  }

  private listenToLoadMore() {
    this.loadMore$.subscribe(() => {
      this.store.dispatch(new StartLoading());
      this.isLoading = true;
      this._pageIndex += 1;
      this.store.dispatch(
        new LoadMoreHomeList({
          _page: String(this._pageIndex),
          _limit: String(this._itemsPerPage),
        })
      );
    });
  }

  private listenScrollAndResize() {
    merge(fromEvent(window, 'scroll'), fromEvent(window, 'resize'))
      .pipe(
        filter(() => {
          return (
            window.innerHeight + window.scrollY >= document.body.clientHeight &&
            !this.isLoading &&
            this.canLoadMore
          );
        })
      )
      .subscribe(() => {
        this.loadMore$.next();
      });
  }

  trackByFn(index: number, item: ItemModel) {
    return item.id;
  }
  private listenToLoadingAbility() {
    this.store
      .pipe(takeUntil(this.destruct$), select(fromHomes.homes.canLoadMore))
      .subscribe((canLoad) => {
        this.canLoadMore = canLoad;
      });
  }

  private listenToLoadingStatus() {
    this.store
      .pipe(takeUntil(this.destruct$), select(fromHomes.homes.loading))
      .subscribe((loadingStatus) => {
        this.isLoading = loadingStatus;
      });
  }

  private listenToData() {
    this.data$ = combineLatest(
      this.store.pipe(
        takeUntil(this.destruct$),
        select(fromHomes.homes.homesItems)
      ),
      this.filter$
    ).pipe(
      map(([items, filter]) => {
        const searchKey = filter.searchKey;
        if (
          (searchKey.length > 2 &&
            searchKey.length >= this.previousSearchKey.length) ||
          (searchKey.length < this.previousSearchKey.length &&
            searchKey.length <= 3)
        ) {
          return items.filter((item) => {
            const normalizedItemName = this._normalizeValue(item.name);
            const normalizedItemAddress = this._normalizeValue(item.address);
            const normalizedFilterSearchKey = this._normalizeValue(
              filter.searchKey
            );
            return (
              normalizedItemName.indexOf(normalizedFilterSearchKey) > -1 ||
              normalizedItemAddress.indexOf(normalizedFilterSearchKey) > -1
            );
          });
        } else return items;
      })
    );
  }

  private listeInput() {
    this.filteredOptions$ = combineLatest(
      this.store.pipe(
        takeUntil(this.destruct$),
        select(fromHomes.homes.searchOptions)
      ),
      this.filter$
    ).pipe(
      map(([filteredOptions, filter]) => {
        return filteredOptions
          ? filteredOptions.filter((item) => {
              return this._normalizeValue(item.match).includes(
                filter.searchKey
              );
            })
          : [];
      })
    );
    this.control.valueChanges.subscribe((value) => {
      this.filter$.next({ ...this.filter$.value, searchKey: value });
    });
  }

  private _normalizeValue(value: string): string {
    const normalizedVal = value
      .toLowerCase()
      .replace(/\s/g, '')
      .replace('-', '');
    return normalizedVal;
  }
}
