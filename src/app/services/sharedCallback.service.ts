import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private callbackSubject = new Subject<any>();

  sendCallback(callback: any) {
    this.callbackSubject.next(callback);
  }

  getCallback() {
    return this.callbackSubject.asObservable();
  }
}