import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ItemsModel } from '@core/models/items.model';

@Injectable({ providedIn: 'root' })
export class HomesService {
  public constructor(private httpClient: HttpClient) {}

  getHomesList(
    params: { [key: string]: string | string[] } = {}
  ): Observable<any> {
    return timer(0, 300000).pipe(
      switchMap(() => this.httpClient.get('/homes', { params }))
    );
  }

  getSearchOptions() {
    return this.httpClient.get('/searchOptions');
  }

  getItem() {
    return this.httpClient.get('/item');
  }
}
