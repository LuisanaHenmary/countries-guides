import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { Country } from '../../models/country.model';
import { CountriesService } from '../../services/countries.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css'
})
export class CountryDetailComponent implements OnInit {

  country: Country | null = null;
  loading = true;
  error = false;

  constructor (
    private route: ActivatedRoute,
    private countryService: CountriesService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get("code");

    if(code){
      this.countryService.getCountryByCode(code).subscribe({
        next: (data) => {
          this.country = data[0];
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      })
    }
  }

}
