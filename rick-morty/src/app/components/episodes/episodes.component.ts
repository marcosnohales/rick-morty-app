import { EpisodeCharacterDetailModalComponent } from './../shared/episode-character-detail-modal/episode-character-detail-modal.component';
import { Component, OnInit } from '@angular/core';
import { EpisodeService } from './episode.service';
import { IEpisodes } from './episodes.model';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [TableModule, PaginatorModule, FormsModule],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss',
  providers: [DialogService]
})
export class EpisodesComponent implements OnInit {

  episodes?: IEpisodes[];
  totalRecords = 0;
  rows = 20;
  currentPage: number = 1;
  errorOnSearch = false;

  ref: DynamicDialogRef | undefined;

  name = '';

  constructor(
    private episodeService: EpisodeService,
    private dialogService: DialogService
  )
  {}
  
  ngOnInit(): void {
    this.getAllEpisodes();
  }

  getAllEpisodes(): void {
    this.episodeService.getAllEpisodes(this.currentPage).subscribe({
      next: (res) => {
        //guardo el contenido del body de la llamada que hago al api en una variable
        // el body contiene 2 objetos (info y results), results es el array de episodios
        this.episodes = res.body!.results;
        this.totalRecords = res.body!.info.count;
        // console.log('respuesta de episodes -> ', res.body!);
      }
    })
  }

  onPageChange(event: PaginatorState): void {
    this.currentPage = (event.page ?? 0) + 1;
    this.getAllEpisodes();
  }

  openCharactersModal(charactersUrl: string[]): void {
    // el parametro tiene todas las url con los ids
    console.log('las urls -> ', charactersUrl);
    const charactersIds: string[] = [];
    //recorro las url de los personajes que contienen el id de cada personaje
    for (let i = 0; i < charactersUrl.length; i++) {
      //extraigo el id de cada url
      const charId = this.extractIdFromUrl(charactersUrl[i]);
      // añadir el id a la lista de ids (charactersIds)
      charactersIds.push(charId);
    }
    console.log('los ids -> ', charactersIds);
    this.ref = this.dialogService.open(EpisodeCharacterDetailModalComponent, {
      data: {
        ids: charactersIds
    },
    width: '70vw',
    showHeader: false,
    focusOnShow: false
    }
    )
  }

  searchEpisodes(): void {
    if (this.name !== '') {
     this.episodeService.getEpisodeByName(this.name).subscribe({
      next: (res) => {
        console.log(res.body!.results);
        this.episodes = [];
        this.episodes = res.body!.results;
        this.totalRecords = res.body!.info.count;
      },
      error: (err) => {
        this.errorOnSearch = true;
        this.episodes = undefined;
      }
     })
    }
    if (this.name === '') {
      this.getAllEpisodes();
    }
  }

  getImage(): string {
    return 'assets/images/no-data.svg';
  }

  private extractIdFromUrl(characterUrl: string): string {
    // separo la url en partes
    //https://rickandmortyapi.com/api/character/1 <-- quiero el 1
    const parts = characterUrl.split('/');
    const id = parts[parts.length - 1];

    return id;
  }

  
}
