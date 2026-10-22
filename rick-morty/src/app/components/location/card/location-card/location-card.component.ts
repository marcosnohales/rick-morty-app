import { Component, Input, OnInit } from '@angular/core';
import { ILocation } from '../../location.model';
import { CharacterService } from '../../../characters/character.service';
import { ICharacter } from '../../../characters/characters.model';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})
export class LocationCardComponent implements OnInit{

  @Input() location?: ILocation;
  images: string[] = [];

  constructor(private characterService: CharacterService){}
  
  ngOnInit(): void {
      if (this.location) {
        this.getResidents();
      }
  }

  private getResidents(): void {
    const ids = this.collectIds();
    this.characterService.getSpecificCharacters(ids).subscribe({
      next: (res) => {
        const residents: ICharacter[] = res.body!;
        this.collectImages(residents)
      }
    });
  }

  private collectIds(): string[] {
    const residentIds: string[] = [];
    if (this.location) {
      const residentUrls = this.location.residents;
      for (let index = 0; index < residentUrls.length; index++) {
        residentIds.push(this.extractIdFromUrl(residentUrls[index]));
      }
    }
    return residentIds;
  }

  private extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    const id = parts[parts.length - 1];

    return id;
  } 

  private collectImages(residents: ICharacter[]): void {
    for (let index = 0; index < residents.length; index++) {
      if (residents[index].image) {
        this.images.push(residents[index].image);
      }            
    }
  }
}
