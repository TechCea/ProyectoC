import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Card } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  constructor(private http: HttpClient) {}

  getCards(name: string | null, offset = 0) {
    const params: any = {
      num: 100,
      offset,
    };
    if(name) params.fname = name;
    return this.http.get<any>(this.API_URL, { params }).pipe(
      map((res) => res.data)
    );
  }
  
  getCard(id: string): Observable<Card> {
    const params = { id };
    return this.http.get<any>(this.API_URL, { params }).pipe(
      map((res) => (res.data && res.data.length > 0 ? res.data[0] : null))
    );
  }
}