import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { NgFor } from '@angular/common';
import { CardService } from '../../services/card.service';
import { HttpClientModule } from '@angular/common/http';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent,NgFor, HttpClientModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [CardService]
})
export class ListComponent implements OnInit {
  cards: Card[] = [];
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getCards().subscribe((res) => {
      console.log(res);
      this.cards = res
    });
  }
}
