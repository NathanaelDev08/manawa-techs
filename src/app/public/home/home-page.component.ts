import { Component } from '@angular/core';
import { HomeComponent } from './home.component';
import { ServicesComponent } from '../services/services.component';
import { PacksComponent } from '../packs/packs.component';
import { FaqComponent } from '../contact/faq.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomeComponent,
    ServicesComponent,
    PacksComponent,
    FaqComponent,
    ContactComponent
  ],
  template: `
    <app-home />
    <app-services />
    <app-packs />
    <app-faq />
    <app-contact />
  `
})
export class HomePageComponent {}
