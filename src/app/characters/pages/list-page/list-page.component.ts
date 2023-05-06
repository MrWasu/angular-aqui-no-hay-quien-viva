import { Component, OnInit } from '@angular/core';
import { Character, Serie } from '../../interfaces/character.interface';
import { CharacterService } from '../../services/characters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public characters: Character[] = [];
  public url: string = this.router.url;
  public serie: string = ''

  constructor(
    private characterService: CharacterService,
    private router: Router) { }


  ngOnInit(): void {

    if (this.url === '/characters/list-aqnhqv') {
      this.serie = 'Aqui no hay quien viva'
    }
    else {
      this.serie = 'La que se avecina'
    }

    this.characterService.getCharacters()
      .subscribe(characters => {
        this.characters = characters.filter(character => character.serie === this.serie);
      });
  }

}
