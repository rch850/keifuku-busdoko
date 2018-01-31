import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Rosen } from './rosen';
import { Busstop } from './busstop';
import { Realtime } from './realtime';

@Injectable()
export class KeifukuService {

  constructor(private http: HttpClient) { }

  rosenkeitobusLookup() {
    const url = 'http://busnavi.keifuku.co.jp:81/rosenkeitobusLookup.php';
    return this.http.jsonp(url, 'callback') as Observable<{
      rosen: Array<Rosen>
    }>;
  }

  busstopLookup(rosenid, keitoid) {
    const url = `http://busnavi.keifuku.co.jp:81/busstopLookup.php?rosenid=${rosenid}&keitoid=${keitoid}`;
    return this.http.jsonp(url, 'callback') as Observable<{
      rosenid: number,
      keitoid: number,
      list: Array<Busstop>
    }>;
  }

  rosenLookup(rosenid, keitoid) {
    const url = `http://busnavi.keifuku.co.jp:81/rosenLookup.php?rosenid=${rosenid}&keitoid=${keitoid}`;
    return this.http.jsonp(url, 'callback') as Observable<{
      realtime: Array<Realtime>
    }>;
  }

}
