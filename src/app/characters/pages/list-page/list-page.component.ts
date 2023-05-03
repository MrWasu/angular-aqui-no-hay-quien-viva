import { Component, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { CharacterService } from '../../services/characters.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public characters: Character[] = [];

  constructor( private characterService: CharacterService ) {}

  ngOnInit(): void {
    this.characterService.getCharacters()
      .subscribe( characters => this.characters = characters);
  }

}
