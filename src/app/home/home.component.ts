import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  myNumbersSubscription: Subscription;
  myObservableSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000)
      .map((number: number) => { return number * 2; });
    this.myNumbersSubscription = myNumbers.subscribe((x: number) => { console.log(x) });


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

    this.myObservableSubscription = myObservable.subscribe(
      (msg: string) => { console.log(msg); },
      (error: string) => { console.log(error); },
      () => { console.log("complete"); }
    );
  }

  ngOnDestroy() {
    this.myNumbersSubscription.unsubscribe();
    this.myObservableSubscription.unsubscribe();
  }

}
