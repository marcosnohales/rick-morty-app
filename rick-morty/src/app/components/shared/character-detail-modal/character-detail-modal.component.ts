import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CharacterService } from '../../characters/character.service';
import { ICharacter } from '../../characters/characters.model';
import { NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-character-detail-modal',
  standalone: true,
  imports: [NgIf, ButtonModule],
  templateUrl: './character-detail-modal.component.html',
  styleUrl: './character-detail-modal.component.scss'
})
export class CharacterDetailModalComponent implements OnInit{

  character?: ICharacter;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private characterService: CharacterService
  ){}

  ngOnInit(): void {
    if (this.config.data) {
      if (this.config.data.id) {
        console.log('tengo el id! -> ', this.config.data?.id);
        this.getCharacter(this.config.data?.id);
      }
    }    
  }

  getCharacter(id: number): void {
    this.characterService.getCharacter(id).subscribe({
      next: (res) => {
        if (res.body) {
          this.character = res.body;
          console.log('el character -> ', this.character);
        }
      }
    })
  }

  close(): void {
    this.ref.close();
  }
}


