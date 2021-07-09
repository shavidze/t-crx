import { HomeModel } from '@core/models/home.model';
import { ItemModel } from '@core/models/item.model';
import { SearchOptionModel } from '@core/models/search.model';
import { HomesActionUnion, HomesActionTypes } from '../actions/homes.actions';

export interface State {
  item: ItemModel;
  homes: HomeModel[];
  searchOptions: SearchOptionModel[];
  canLoadMore: boolean;
  loading: boolean;
}

export const initialState: State = {
  item: Object.assign({}),
  homes: [],
  searchOptions: [],
  canLoadMore: true,
  loading: false,
};

export function reducer(state: State, action: HomesActionUnion): State {
  state = Object.assign({}, initialState, state);

  switch (action.type) {
    case HomesActionTypes.GetHomesListSuccess:
      return {
        ...state,
        homes: action.payload.data,
      };
    case HomesActionTypes.LoadMoreHomeListSuccess:
      return {
        ...state,
        loading: false,
        homes: [...state.homes, ...action.payload.data],
      };
    case HomesActionTypes.LoadMoreHomeListFailed:
      return {
        ...state,
        loading: false,
        canLoadMore: false,
      };
    case HomesActionTypes.GetSearchOptionsSuccess:
      return {
        ...state,
        searchOptions: action.payload.data,
      };
    case HomesActionTypes.GetHomeItemSuccess:
      return {
        ...state,
        item: action.payload.data,
      };
    case HomesActionTypes.StartLoading:
      return {
        ...state,
        loading: true,
      };
    default: {
      return state;
    }
  }
}
