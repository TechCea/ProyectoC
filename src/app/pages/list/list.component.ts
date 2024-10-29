import { Component, HostListener, OnInit, } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { NgFor } from '@angular/common';
import { CardService } from '../../services/card.service';
import { HttpClientModule } from '@angular/common/http';
import { Card } from '../../interfaces/card.interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent,NgFor, HttpClientModule,InfiniteScrollModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [CardService]
})

export class ListComponent implements OnInit {
  cards: Card[] = [];
  offset = 0;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      this.loadMoreCards();
    }
  }

  loadCards() {
    this.cardService.getCards(this.offset).subscribe((res) => {
      this.cards = [...this.cards, ...res];
    });
  }

  loadMoreCards() {
    this.offset += 100;
    this.loadCards();
  }
}
