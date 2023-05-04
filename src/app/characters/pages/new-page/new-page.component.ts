import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Character, Serie } from '../../interfaces/character.interface';
import { CharacterService } from '../../services/characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public characterForm = new FormGroup({
    id:               new FormControl<string>(''), //! apuntes cuando formularios reactivos
    character:        new FormControl<string>('', { nonNullable: true }),
    serie:            new FormControl<Serie>( Serie.Aqnhqv ),
    alter_ego:        new FormControl(''),
    live_actor:       new FormControl(''),
    cohabitants:      new FormControl(''),
    alt_img:          new FormControl(''),
  });

  public Serie = [
    { id: 'aqnhqv', desc: 'Aqui no hay quien viva' },
    { id: 'lqsa', desc: 'La que se avecina' },
  ];

  constructor(
    private characterService: CharacterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  get currentCharacter(): Character {
    const character = this.characterForm.value as Character;
    return character;
    // se utiliza un getter para pasar el objeto resultante del formulario al tipo Character
    // para poder equipararlos y que los dos objetos puedan ser similares
  }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.characterService.getCharacterById( id ) ),
      ).subscribe( character => {

        if ( !character ) {
          return this.router.navigateByUrl('/');
        }

        this.characterForm.reset( character );
        return;
      });
  }


  onSubmit():void {

    if ( this.characterForm.invalid ) return;

    // Actualizar
    if ( this.currentCharacter.id ) {
      this.characterService.updateCharacter( this.currentCharacter )
        .subscribe( character => {

          this.showSnackbar(`${ character.character } updated!`);
        });

      return;
    }

    // Crear
    this.characterService.addCharacter( this.currentCharacter )
      .subscribe( character => {
      
        this.router.navigate(['/characters/edit', character.id ]);
        this.showSnackbar(`${ character.character } created!`);
      });
  }

  onDeleteCharacter() {
    if ( !this.currentCharacter.id ) throw Error('character id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.characterForm.value
    });

    dialogRef.afterClosed() 
      .pipe(
        filter( (result: boolean) => result ), // deja pasar solo si es true, sino hace return
        switchMap( () => this.characterService.deleteCharacterById( this.currentCharacter.id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/characters']);
      });
    }




  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2000,
    })
  }

}
