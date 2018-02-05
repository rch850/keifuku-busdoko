import { TestBed, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { KeifukuService } from './keifuku.service';
import { of } from 'rxjs/observable/of';

describe('AppComponent', () => {
  let keifukuServiceStub;

  beforeEach(async(() => {
    keifukuServiceStub = {
      rosenkeitobusLookup() {
        return of({
          rosen: [
            {'rosenid': 1, 'rosenname': 'コミュニティバスすまいる', 'keitoid': 1, 'ikisaki': 'すまいる 田原・文京方面'},
            {'rosenid': 1, 'rosenname': '運動公園線', 'keitoid': 2, 'ikisaki': 'すまいる 照手・足羽方面'}
          ]
        });
      },
      busstopLookup(rosenid, keitoid) {
        return of({
          'rosenid': rosenid,
          'keitoid': keitoid,
          'list': [
            {'odr': 1, 'name': '駅前商店街'},
            {'odr': 2, 'name': '福井市役所'},
            {'odr': 3, 'name': '中央公園'},
            {'odr': 4, 'name': '片町商店街'},
            {'odr': 5, 'name': '春山二丁目'}
          ]
        });
      },
      rosenLookup(rosenid, keitoid) {
        return of({realtime: [
          {'rosenid': rosenid, 'keitoid': keitoid, 'lat': 36.056992, 'lon': 136.199661, 'busstopodr': 2, 'datetime': '20130201085742'}
        ]});
      }
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: KeifukuService, useValue: keifukuServiceStub },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have one viewData after search', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    app.onSearch('中央公園');
    expect(app.viewData.length).toBe(1);
  }));

});
