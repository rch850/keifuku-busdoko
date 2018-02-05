import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';

import { KeifukuService } from './keifuku.service';
import { HttpBackend, JsonpClientBackend } from '@angular/common/http';

// About testing JSONP request: https://github.com/angular/angular/issues/20878

describe('KeifukuService', () => {
  let keifuku: KeifukuService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        KeifukuService,
        { provide: JsonpClientBackend, useExisting: HttpBackend }
      ]
    });
    // Inject the http service and test controller for each test
    httpTestingController = TestBed.get(HttpTestingController);
    keifuku = TestBed.get(KeifukuService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([KeifukuService], (service: KeifukuService) => {
    expect(service).toBeTruthy();
  }));

  it('busstopLookup', () => {
    const expected = {
      rosenid: 1, keitoid: 2, list: []
    };
    keifuku.busstopLookup(1, 2).subscribe(data => {
      expect(data).toEqual(expected);
    });

    const req = httpTestingController.expectOne(request => {
      return request.url === 'http://busnavi.keifuku.co.jp:81/busstopLookup.php?rosenid=1&keitoid=2';
    });
    expect(req.request.method).toBe('JSONP');
    req.flush(expected);
  });
});
