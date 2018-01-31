import { Busstop } from './busstop';

export interface Rosen {
  rosenid: number;
  rosenname: string;
  keitoid: number;
  ikisaki: string;

  busstops: Array<Busstop>;
}
