import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Need } from './need/need';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NeedService {

  private needsUrl = 'http://localhost:8080/needs'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService, private authService: AuthService) { }

  /** GET needs from the server */
  getNeeds(): Observable<Need[]> {
    return this.http.get<Need[]>(this.needsUrl)
    .pipe(
      tap(_ => this.log('fetched needs')),
      catchError(this.handleError<Need[]>('getNeeds', []))
    );
  }

  private getUserCartKey(): string | null {
    const username = this.authService.getUsername();
    return username ? `cart_${username}` : null;
  }


  getCart(): Need[] {
    const cartKey = this.getUserCartKey();
    if (!cartKey) return [];
    const cart = localStorage.getItem(cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  /** GET need by id. Return `undefined` when id not found */
  getNeedNo404<Data>(id: number): Observable<Need> {
    const url = `${this.needsUrl}/?=${id}`;
    return this.http.get<Need[]>(url)
    .pipe(
      map(needs => needs[0]), // returns a {0|1} element array
      tap(n => {
        const outcome = n ? 'fetched' : 'did not find';
        this.log(`${outcome} need id=${id}`);
      }),
      catchError(this.handleError<Need>(`getNeed id=${id}`))
    );
  }

  /** GET need by id. Will 404 if id not found */
  getNeed(id: number): Observable<Need> {
    const url = `${this.needsUrl}/${id}`;
    return this.http.get<Need>(url).pipe(
      tap(_ => this.log(`fetched need id=${id}`)),
      catchError(this.handleError<Need>(`getNeed id=${id}`))
    );
  }

  /** GET needs whose name contains search term */
  searchNeeds(term: string): Observable<Need[]> {
    if(!term.trim()) {
      // if not search term, return an empty need array
      return of([]);
    }
    return this.http.get<Need[]>(`${this.needsUrl}/?name=${term}`).pipe(
      tap(x => x.length ? 
        this.log(`found needs matching "${term}"`) :
        this.log(`no needs found matching "${term}"`)),
      catchError(this.handleError<Need[]>('searchNeed', []))  
    );
  }

  /** POST: add new need to server */
  addNeed(need: Need): Observable<Need> {
    return this.http.post<Need>(this.needsUrl, need, this.httpOptions).pipe(
      tap((newNeed: Need) => this.log(`added need w/ id=${newNeed.id}`)),
      catchError(this.handleError<Need>('addNeed'))
    );
  }

  /** Adds need to the funding basket from the cupboard */
  addToCart(need: Need): void { 
    const cartKey = this.getUserCartKey();
    if (!cartKey) return;
    const cart = this.getCart();
    const existingNeed = cart.find(cartNeed => cartNeed.id === need.id);

    // if the need already exist increments the quantity
    if (existingNeed){
      existingNeed.quantity += 1;
    
    // if the need doesn't exist in the cart it creates it with a quantity of 1
    }else{
      cart.push({...need, quantity: 1});
    }
    localStorage.setItem(cartKey, JSON.stringify(cart));
    this.log(`added ${need.name} to cart`);

    // removes the need from the cupboard
    need.quantity -= 1
    this.updateNeed(need).subscribe();
  }

  /** DELETE: delete the need from the server */
  deleteNeed(id: number): Observable<Need> {
    const url = `${this.needsUrl}/${id}`;
    return this.http.delete<Need>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted need id=${id}`)),
      catchError(this.handleError<Need>('deleteNeed'))
    );
  }

  /** Removes need from funding basket and adds it back to the cupboard */
  removeFromCart(id: number): void {
    const cartKey = this.getUserCartKey();
    if (!cartKey) return;
    const cart = this.getCart();
    const removeNeedIndex = cart.findIndex(need => need.id === id);
    if (removeNeedIndex > -1) {
      const removeNeed = cart[removeNeedIndex];
      this.getNeed(id).subscribe((inventoryNeed) => {
        inventoryNeed.quantity += 1;
        this.updateNeed(inventoryNeed).subscribe()
      });

      if(removeNeed.quantity > 1) {
        removeNeed.quantity -= 1;
      } else {
        cart.splice(removeNeedIndex, 1);
      }
      localStorage.setItem(cartKey, JSON.stringify(cart));
      this.log(`removed ${removeNeed.name} from cart`);
    }
  }
            

  clearCart(): void {
    const cartKey = this.getUserCartKey();
    if (!cartKey) return;
    const cart = this.getCart();
    
    cart.forEach(cartNeed => {
      this.getNeed(cartNeed.id).subscribe((cupboardNeed) => {
        cupboardNeed.quantity += cartNeed.quantity;

        this.updateNeed(cupboardNeed).subscribe();
      });
    });

    localStorage.removeItem(cartKey);
    this.log('cleared cart');

  }

  checkout(): void {
    const cartKey = this.getUserCartKey();
    if (!cartKey) return;
    localStorage.removeItem(cartKey);
    this.log('checkout');
  }

  /** PUT: update the need on the server */
  updateNeed(need: Need): Observable<any> {
    return this.http.put(this.needsUrl, need, this.httpOptions).pipe(
      tap(_ => this.log(`updated need id=${need.id}`)),
      catchError(this.handleError<any>('updateNeed'))
    );
  }

  /**
   * Handle Http operations that failed.
   * Let the app continue.
   * 
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep runningh by returning an empty result
      return of(result as T);
    };
  }

  /** Log a NeedService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`NeedService: ${message}`);
  }
}
