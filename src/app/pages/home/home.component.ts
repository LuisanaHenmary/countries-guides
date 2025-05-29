import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/country.model';
import { CommonModule } from '@angular/common';
import { CountryCardComponent } from '../../components/country-card/country-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CountryCardComponent,
    SearchBarComponent,
    FilterPanelComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private countryService: CountriesService) { }

  ngOnInit(): void {
    this.loadAllCountries()
  }

  countries: Country[] = [];
  pagedCountries: Country[] = [];

  currentPage = 1;
  itemsPerPage = 12;

  totalPages = 0;
  disableSearchBar = false
  disableFilterPanel = false

  loadAllCountries(): void {
    this.countryService.getAllCountries().subscribe((data) => {
      this.countries = data;
      this.totalPages = Math.ceil(this.countries.length / this.itemsPerPage);
      this.updatePagedCountries();
    });
  }

  updatePagedCountries() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedCountries = this.countries.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedCountries();
    }
  }

  onSearch(event: any) {
    this.currentPage = 1;
    const term = event?.target?.value
    const searchTerm = term.trim().toLowerCase();

    if (searchTerm != "") {
      this.disableFilterPanel = true
      this.countryService.searchCountriesByName(searchTerm).subscribe((data) => {
        this.countries = data;
        this.totalPages = Math.ceil(this.countries.length / this.itemsPerPage);
        this.updatePagedCountries();
      });
    } else {
      this.disableFilterPanel = false
      this.loadAllCountries()
    }

  }

  onSelect(event: any) {
    this.currentPage = 1;
    const region = event?.target?.value
    const selecedRegion = region.trim().toLowerCase();

    if (selecedRegion != "") {
      this.disableSearchBar = true
      this.countryService.getCountryByRegion(selecedRegion).subscribe((data) => {
        this.countries = data;
        this.totalPages = Math.ceil(this.countries.length / this.itemsPerPage);
        this.updatePagedCountries();
      });
    } else {
      this.disableSearchBar = false
      this.loadAllCountries()
    }
  }


}
