export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

export interface PeriodicTableState {
  elements: PeriodicElement[];
}
