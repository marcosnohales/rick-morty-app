import { Component, OnInit, ViewChild } from '@angular/core';
import { ICharacter, ICharacterFilter } from './characters.model';
import { IPagination } from '../utils/pagination.model';
import { CharacterService } from './character.service';
import { NgIf } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CharacterDetailModalComponent } from '../shared/character-detail-modal/character-detail-modal.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToggleSwitch, ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { CharacterCardComponent } from './card/character-card/character-card.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [NgIf,
     PaginatorModule,
      FormsModule,
      ProgressSpinnerModule,
      ReactiveFormsModule,
      ToggleSwitchModule,
      SelectModule,
    CharacterCardComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  providers: [DialogService]
})
export class CharactersComponent implements OnInit{
  @ViewChild('toggleSwitch') toggleSwitch!: ToggleSwitch;
  characters: ICharacter[] = [];
  info: IPagination | null = null;
  currentPage: number = 1;
  totalRecords = 0;
  rows = 20;
  first = 0;

  modalRef: DynamicDialogRef | undefined; 
  
  loadingCharacters = true;
  speciesSwitchFilter = false;
  formIsEmpty = false;
  filterForm?: FormGroup;
  status = ['Alive', 'Dead', 'Unknown']
  genders = ['Masculino', 'Femenino']
  filterOptions: ICharacterFilter = {
    page: this.currentPage.toString(),
    name: '',
    species: '',
    status: '',
    gender:''
  }


  constructor(private characterService: CharacterService,
     private dialogService: DialogService,
     private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initForm();
    this.getAllCharacters(); // traerme todos los characters
  }

  getAllCharacters(): void {
    this.characterService.getAllCharacters(this.filterOptions).subscribe({
      next: (res) => {
        this.characters = res.body!.results;
        this.info = res.body!.info;
        this.totalRecords = this.info.count;
        this.loadingCharacters = false;
        // console.log('llamada completada');
        // console.log(this.characters);
      }
    });
  }

  onPageChange(event: PaginatorState): void {
    this.currentPage = (event.page ?? 0) + 1;
    this.filterOptions.page = this.currentPage.toString();
    this.loadingCharacters = true;
    this.getAllCharacters();
  }

  showDetails(characterId: number): void {
    this.modalRef = this.dialogService.open(CharacterDetailModalComponent, {
      data: {
        id: characterId
    },
    width: '50vw',
    showHeader: false,
    focusOnShow: false
    });
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/image-not-found.svg';
  }

  searchCharacters(): void {
    this.formIsEmpty = this.verifyEmptyForm();
    if (this.filterForm && !this.formIsEmpty) {
      this.filterOptions.name = this.filterForm!.get('name')?.value;
      this.filterOptions.species = this.filterForm.get('species')?.value;
      this.filterOptions.status = this.filterForm.get('status')?.value;
      this.filterOptions.gender = this.translateGender(this.filterForm.get('gender')?.value);
      this.getAllCharacters();
    }

  }

  handleSwitchFilter(): void {
    this.speciesSwitchFilter = !this.speciesSwitchFilter;

    if (this.filterForm) {
      const speciesControl = this.filterForm.get('species');

      if (this.speciesSwitchFilter) {
        speciesControl?.enable();
      } else {
        speciesControl?.disable();
      }
    }
  }

  hasErrors(fieldName: string): boolean {
    if (this.filterForm) {
      if (fieldName === 'species' && this.speciesSwitchFilter) {
        return this.verifySpeciesField();
      }
    }

    return false;
  }

  clearFormAndFilters(): void {
    if (this.filterForm) {
      this.toggleSwitch.writeValue(false);
      this.filterForm.reset({
        name: '',
        species: {value: '', disabled: true},
        status:'',
        gender: ''
      });
      this.filterOptions.name = '';
      this.filterOptions.species = '';
      this.filterOptions.status = '';
      this.filterOptions.gender = '';
      this.currentPage = 1;
      this.formIsEmpty = false;
      this.getAllCharacters();
    }
  }

  initForm(): void {
    this.filterForm = this.formBuilder.group({
      name: [''],
      species: [{value: '', disabled: true}, Validators.required],
      status: [''],
      gender: ['']
    });
  }

  private verifySpeciesField(): boolean {
    return this.filterForm!.get('species')!.hasError('required')
    && this.filterForm!.get('species')!.touched;
  }

  private verifyEmptyForm(): boolean {
    const formValues = this.filterForm!.value;
    return !formValues.name 
    && !formValues.species 
    && !formValues.status
    && !formValues.gender;
  }

  private translateGender(gender: string): string {
    if (gender === 'Masculino') {
      return 'male';
    }
    if (gender === 'Femenino') {
      return 'female';
    }

    return '';
  }
}
