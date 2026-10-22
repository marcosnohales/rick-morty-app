import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CharacterService } from '../../characters/character.service';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ICharacter } from '../../characters/characters.model';

@Component({
  selector: 'app-episode-character-detail-modal',
  standalone: true,
  imports: [ButtonModule, CarouselModule],
  templateUrl: './episode-character-detail-modal.component.html',
  styleUrl: './episode-character-detail-modal.component.scss'
})
export class EpisodeCharacterDetailModalComponent implements OnInit{
  
  characters: ICharacter[] = [];
  
  constructor(
        private ref: DynamicDialogRef,
        private config: DynamicDialogConfig,
        private characterService: CharacterService
  ){}
  
  ngOnInit(): void {
    if (this.config.data) {
      if (this.config.data.ids) {
        //recupero los ids que envío desde episodes.component.ts
        this.getCharacters(this.config.data.ids);
      }
    }
  }

  close(): void {
    this.ref.close();
  }

  private getCharacters(characterIds: string[]): void {
    //llamo al servicio que me trae los characters añadiendo una lista de ids a la petición http
    this.characterService.getSpecificCharacters(characterIds).subscribe({
      next: (res) => {
        this.characters = res.body!;
      }
    });
  }
}
