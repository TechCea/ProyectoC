import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { NgFor } from '@angular/common';
import { CardService } from '../../services/card.service';
import { HttpClientModule } from '@angular/common/http';
import { Card } from '../../interfaces/card.interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, NgFor, HttpClientModule, InfiniteScrollModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [CardService]
})
export class ListComponent implements OnInit {
  cards: Card[] = [];
  offset = 0;
  searchTerm: string | null = null;
  cardTextFC = new FormControl('');

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardTextFC.valueChanges
      .pipe(
        debounceTime(500), // Espera 300 ms después de que el usuario deje de escribir
        distinctUntilChanged() // Solo actúa si el valor ha cambiado
      )
      .subscribe((res) => {
        this.searchTerm = res;
        this.offset = 0;
        this.cards = [];
        this.loadCards(this.searchTerm);
      });

    this.loadCards();
  }

  loadCards(cardName: string | null = null) {
    this.cardService.getCards(cardName, this.offset).subscribe((res) => {
      this.cards = [...this.cards, ...res];
    });
  }

  loadMoreCards() {
    this.offset += 100;
    this.loadCards(this.searchTerm);
  }
}
