import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const myNumbers = Observable.interval(1000);
    // myNumbers.subscribe((x: number) => { console.log(x) });
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);

      setTimeout(() => {
        observer.next('second package');
      }, 4000);

      setTimeout(() => {
        // observer.error('this doesn\'t work');
        observer.complete();
      }, 5000);

      setTimeout(() => {
        observer.next('third package');
      }, 6000);
    });

    myObservable.subscribe(
      (msg: string) => { console.log(msg); },
      (error: string) => { console.log(error); },
      () => { console.log("complete"); }
    );
  }

}
