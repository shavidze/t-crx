export type NameOrLocation = 'location' | 'name';
export interface SearchOptionModel {
  match: string;
  kind: NameOrLocation
}
