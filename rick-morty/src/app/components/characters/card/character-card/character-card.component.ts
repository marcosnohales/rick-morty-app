import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICharacter } from '../../characters.model';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {

  @Input() character?: ICharacter;

  @Output() onDetailClick: EventEmitter<number> = new EventEmitter<number>();

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/image-not-found.svg';
  }

  showDetails(characterId: number): void {
    this.onDetailClick.emit(characterId);
  }
}
