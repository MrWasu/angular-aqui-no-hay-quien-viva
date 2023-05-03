import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Character } from '../../interfaces/character.interface';
import { CharacterService } from '../../services/characters.service';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public character: Character[] = [];
  public selectedCharacter?: Character;

  constructor( private characterService: CharacterService ){}

  searchCharacter() {
    const value: string = this.searchInput.value || '';

    this.characterService.getSuggestions( value )
      .subscribe( character => this.character = character );
  }


  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedCharacter = undefined;
      return;
    }

    const character: Character = event.option.value;
    this.searchInput.setValue( character.character );

    this.selectedCharacter = character;

  }


}
