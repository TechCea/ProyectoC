import { Component,Input,OnInit } from '@angular/core';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  constructor(){

  }

  ngOnInit(): void {
      
  }
}
