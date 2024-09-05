import { Component, OnInit } from '@angular/core';
import { ApiContactsService } from '../../services/api-contacts.service';
import { Contacts } from '../../models/contacts.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-contacts.component.html',
  styleUrl: './mis-contacts.component.css'
})
export class MisContactsComponent implements OnInit {
  contacts: Contacts[] = [];

  constructor(private apiContactsService: ApiContactsService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.apiContactsService.getContacts().subscribe(
      (data) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Error fetching contacts', error);
      }
    );
  }
}
