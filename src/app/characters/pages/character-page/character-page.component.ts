import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { CharacterService } from '../../services/characters.service';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './character-page.component.html',
  styles: [
  ]
})
export class CharacterPageComponent implements OnInit {

  public character?: Character;

  constructor(
    private characterService: CharacterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.characterService.getCharacterById( id )),
      )
      .subscribe( character => {

        if ( !character ) return this.router.navigate([ '/characters/list-aqnhqv' ]);

        this.character = character;
        return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('characters/list-aqnhqv')
  }

}
