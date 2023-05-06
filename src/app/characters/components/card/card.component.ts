import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'character-card',
  templateUrl: './card.component.html',
  styles: [
    `
    .mat-button {
      color: orange;
    }
  `
  ]
})
export class CardComponent implements OnInit {

  @Input()
  public character!: Character;


  ngOnInit(): void {
    if ( !this.character ) throw Error('Character property is required');
  }
}
