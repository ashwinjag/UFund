import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { 
  debounceTime, distinctUntilChanged, switchMap 
} from 'rxjs/operators';

import { Need } from '../need/need';
import { NeedService } from '../need.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {
  needs$!: Observable<Need[]>;
  private searchTerms = new Subject<string>();
  constructor(private needService: NeedService) {}

  // push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.needs$ = this.searchTerms.pipe(
      // waits 300ms after each key before considering the term
      debounceTime(300),

      // ignores new term if it's the same as the pervious
      distinctUntilChanged(),

      // switches to a new search observable each time the term changes
      switchMap((term: string) => this.needService.searchNeeds(term)),
    );
  }
  addToCart(need: Need): void {
    this.needService.addToCart(need);
  }
}
