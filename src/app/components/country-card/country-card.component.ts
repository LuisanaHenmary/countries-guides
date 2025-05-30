import { Component, Input } from '@angular/core';
import { Country } from '../../models/country.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.css'
})
export class CountryCardComponent {
  @Input() country!: Country;
}
