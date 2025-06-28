export interface IPeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

export enum ETableColumnNames {
  POSITION = 'position',
  NAME = 'name',
  WEIGHT = 'weight',
  SYMBOL = 'symbol',
  ACTIONS = 'actions',
}
