import * as fromRoot from '@reducers/index';
import * as fromHomes from './homes.reducer';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface HomesState {
  homes: fromHomes.State;
}

export interface State extends fromRoot.State {
  homes: HomesState;
}

export const reducers: ActionReducerMap<HomesState> = {
  homes: fromHomes.reducer,
};

export const getCoreModuleState = createFeatureSelector<HomesState>('homes');

export const getHomesState = createSelector(
  getCoreModuleState,
  (state: HomesState) => state.homes
);

export const homes = {
  homesItems: createSelector(
    getHomesState,
    (state: fromHomes.State) => state.homes
  ),
  item: createSelector(getHomesState, (state: fromHomes.State) => state.item),
  searchOptions: createSelector(
    getHomesState,
    (state: fromHomes.State) => state.searchOptions
  ),
  canLoadMore: createSelector(
    getHomesState,
    (state: fromHomes.State) => state.canLoadMore
  ),
  loading: createSelector(
    getHomesState,
    (state: fromHomes.State) => state.loading
  ),
};
