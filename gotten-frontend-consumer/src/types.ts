export interface Treasure {
  owner: string;
  gotcher: string;
  name: string;
  lat: string;
  lon: string;
  value: Value;
  isClaimed: boolean;
  hash: string;
  id: number;
}

export interface Value {
  type: string;
  hex: string;
}
