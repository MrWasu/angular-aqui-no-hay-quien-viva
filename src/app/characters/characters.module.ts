import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CharacterPageComponent } from './pages/character-page/character-page.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { CardComponent } from './components/card/card.component';
import { CharacterImagePipe } from './pipes/character-image.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    CharacterPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,
    
    CharacterImagePipe,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    ReactiveFormsModule, 
    MaterialModule
  ]
})
export class CharactersModule { }
