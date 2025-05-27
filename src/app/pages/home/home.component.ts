import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../models/country.model';
import { CommonModule } from '@angular/common';
import { CountryCardComponent } from '../../components/country-card/country-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CountryCardComponent, SearchBarComponent],
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

  onSearch(value: any) {
    this.currentPage = 1;
    const term = value?.target?.value
    const searchTerm = term.trim().toLowerCase();

    if (searchTerm != "") {
      this.countryService.searchCountriesByName(searchTerm).subscribe((data) => {
        this.countries = data;
        this.totalPages = Math.ceil(this.countries.length / this.itemsPerPage);
        this.updatePagedCountries();
      });
    } else {
      this.loadAllCountries()
    }

  }


}
