import { HomeModel } from './home.model';
import { ItemModel } from './item.model';
import { SearchOptionModel } from './search.model';

export interface ItemsModel {
  homes: HomeModel[];
  searchOptions: SearchOptionModel[];
  item: ItemModel;
}
