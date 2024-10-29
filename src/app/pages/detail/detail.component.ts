import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Observable, pipe, tap } from 'rxjs';
import { Card } from '../../interfaces/card.interface';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { MarketNamePipe } from '../../pipes/market-name.pipe';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf, HttpClientModule, AsyncPipe, NgFor, KeyValuePipe, MarketNamePipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  providers: [CardService]
})
export class DetailComponent implements OnInit{

  id!: string;
  card$!: Observable<Card>;

  constructor(private route: ActivatedRoute, public cardService: CardService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.card$= this.cardService.getCard(this.id);
  }

}
