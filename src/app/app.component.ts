import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { KeifukuService } from './keifuku.service';
import { Rosen } from './rosen';

interface ViewData {
  rosen: string;
  ikisaki: string;
  busstop: string;
  passed: Array<{ busstop: string, passed: boolean }>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  box = '';

  private rosenList: Array<Rosen> = [];

  // 最終的にほしいデータ
  viewData: Array<ViewData> = [];

  constructor(private keifuku: KeifukuService) {}

  ngOnInit(): void {
    this.fetchRosenList();
  }

  onSearch (query) {
    // 該当するバス停が含まれる路線をリストアップ
    const matchedRosenList = this.rosenList.filter(rosen => {
      return rosen.busstops.some(busstop => {
        return busstop.name.indexOf(query) !== -1;
      });
    });

    // 該当する路線の、路線ID→系統ID→路線のマップを作成
    const rosenMap = matchedRosenList.reduce((map, rosen) => {
      if (!map[rosen.rosenid]) {
        map[rosen.rosenid] = [];
      }
      map[rosen.rosenid][rosen.keitoid] = rosen;
      return map;
    }, {} as { [index: number]: Array<Rosen> });

    // 該当する路線を走っているバスをリストアップし、
    // そのバスが走っている場所の配列を作る。
    this.viewData = [];
    matchedRosenList.forEach(rosen => {
      this.keifuku.rosenLookup(rosen.rosenid, rosen.keitoid).subscribe(data => {
        // 該当する路線を走っているバスに対して...
        data.realtime.forEach(realtime => {
          const realtimeRosen: Rosen = rosenMap[realtime.rosenid][realtime.keitoid];
          const passed = [];
          this.viewData.push({
            rosen: realtimeRosen.rosenname,
            ikisaki: realtimeRosen.ikisaki,
            busstop: realtimeRosen.busstops.find(b => b.odr === realtime.busstopodr).name,
            passed: passed
          });
        });
      });
    });
  }

  private fetchRosenList () {
    // 路線、系統データを取得
    this.keifuku.rosenkeitobusLookup().subscribe(data => {

      // 路線を取得
      this.rosenList = data.rosen.filter(rosen => {
        return rosen.rosenname.indexOf('運動公園') === 0;
      });

      // 路線、系統ごとにバス停を取得
      this.rosenList.forEach(rosen => {
        this.keifuku.busstopLookup(rosen.rosenid, rosen.keitoid).subscribe(busstopData => {
          rosen.busstops = busstopData.list;
        });
      });
    });
  }
}
