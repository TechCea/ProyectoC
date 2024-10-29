import { Component,Input,OnInit } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card!: Card;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToCard() {
    this.router.navigate([`/card/${this.card.id}`]);
  }
}