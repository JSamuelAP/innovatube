import { Component, input, output } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-bar',
  imports: [ButtonModule, InputTextModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  value = output<string>();
  placeholder = input<string>('');
}
