import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public data = new Subject<any>();
  public data$ = this.data.asObservable();

  emitdata(x: any) {
    this.data.next(x);
  }

}
