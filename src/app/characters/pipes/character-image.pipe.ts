import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Pipe({
  name: 'characterImage'
})
export class CharacterImagePipe implements PipeTransform {

  transform( character: Character ): string {

    if ( !character.id && !character.alt_img ) {
      return 'assets/no-image.png';
    }

    if ( character.alt_img ) return character.alt_img;

    return `assets/characters/${ character.id }.jpg`;

  }

}
