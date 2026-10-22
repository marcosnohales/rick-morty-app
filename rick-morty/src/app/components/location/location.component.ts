import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { ILocation } from './location.model';
import { LocationCardComponent } from './card/location-card/location-card.component';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [LocationCardComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent implements OnInit {
  
  locations: ILocation[] = [];
  currentPage: number = 1;
  totalRecords = 0;
  rows = 20;
  first = 0;

  constructor(private locationService: LocationService){}
  
  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations(): void {
    this.locationService.getAllLocations(this.currentPage).subscribe({
      next: (res) => {
          this.locations = res.body!.results;
          this.totalRecords = res.body!.info.count;
      }
    })
  }
}
