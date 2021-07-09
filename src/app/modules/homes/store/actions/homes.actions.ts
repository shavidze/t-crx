import { Action } from '@ngrx/store';

export enum HomesActionTypes {
  GetHomesList = '[Homes] Get Homes List',
  GetHomesListSuccess = '[Homes] Get Homes List Success',

  LoadMoreHomeList = '[Load] Load More Home List',
  LoadMoreHomeListSuccess = '[Load] Load More Home List Success',
  LoadMoreHomeListFailed = '[Load] Load More Home List Failed',
  
  GetSearchOptions = '[SearchOptions] Get Search Options',
  GetSearchOptionsSuccess = '[SearchOptions] Get Search Options Success',

  GetHomeItem = '[Item] Get Item',
  GetHomeItemSuccess = '[Item] Get Item Success',

  StartLoading = '[Loading] Start Loading'
}

export class GetHomesList implements Action {
  readonly type: string = HomesActionTypes.GetHomesList;
  constructor(public payload: any = null) {}
}


export class GetHomesListSuccess implements Action {
  readonly type: string = HomesActionTypes.GetHomesListSuccess;
  constructor(public payload: any) {}
}

export class LoadMoreHomeList implements Action {
  readonly type:string = HomesActionTypes.LoadMoreHomeList;
  constructor(public payload:any){}
}

export class StartLoading implements Action {
  readonly type:string = HomesActionTypes.StartLoading;
  constructor(public payload:any = null){}
}
export class LoadMoreHomeListSuccess implements Action{
  readonly type:string = HomesActionTypes.LoadMoreHomeListSuccess;
  constructor(public payload: any){

  }
}

export class LoadMoreHomeListFailed implements Action{
  readonly type:string = HomesActionTypes.LoadMoreHomeListFailed;
  constructor(public payload: any = null){

  }
}

export class GetSearchOptions implements Action {
  readonly type: string = HomesActionTypes.GetSearchOptions;
  constructor(public payload: any = null) {}
}

export class GetSearchOptionsSuccess implements Action {
  readonly type: string = HomesActionTypes.GetSearchOptionsSuccess;
  constructor(public payload: any) {}
}

export class GetHomeItem implements Action {
  readonly type: string = HomesActionTypes.GetHomeItem;

  constructor(public payload: any = null) {}
}

export class GetHomeItemSuccess implements Action {
  readonly type: string = HomesActionTypes.GetHomeItemSuccess;

  constructor(public payload: any = null) {}
}
export type HomesActionUnion = GetHomesList | GetHomesListSuccess | LoadMoreHomeList | LoadMoreHomeListSuccess |GetSearchOptions |GetSearchOptionsSuccess | GetHomeItem | GetHomeItemSuccess;
