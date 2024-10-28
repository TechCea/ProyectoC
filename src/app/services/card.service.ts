import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  constructor(private http: HttpClient) {}

  getCards() {
    const params = {
      num: 100,
      offset: 100
    };
    return this.http.get<any>(this.API_URL, { params }).pipe(
      map((res) => res.data) // Aseguramos que res.data es un array de Card
    );
  }
}