import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MisContactsComponent } from "../mis-contacts/mis-contacts.component";
import { ApiContactsService } from '../../services/api-contacts.service';
import { Contacts } from '../../models/contacts.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [MisContactsComponent, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})

export class DashboardUserComponent implements OnInit {
  contacts: Contacts[] = [];
  editContactForm: FormGroup;
  newContactForm: FormGroup;
  editingContact: Contacts | null | boolean = null;

  constructor(private apiContactsService: ApiContactsService, private fb: FormBuilder) {
    this.editContactForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      description: ['']
    });
    // Formulario para agregar un nuevo contacto
    this.newContactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

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

  hiddenFormEdit() {
    this.editingContact = false;
  }

  // Nueva función para agregar un contacto
  addContact(): void {
    if (this.newContactForm.valid) {
      const newContact = this.newContactForm.value as Contacts;

      this.apiContactsService.addContact(newContact).subscribe(
        (createdContact) => {
          this.contacts.push(createdContact);
          this.newContactForm.reset();
        },
        (error) => {
          console.error('Error adding contact', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  editContact(contact: Contacts): void {
    this.editingContact = contact;
    this.editContactForm.patchValue({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      description: contact.description,
    });
  }

  saveEditContact(): void {
    if (this.editContactForm.valid) {
      const updatedContact = this.editContactForm.value as Contacts;
      
      // Verifica que el ID esté presente y definido
      if (!updatedContact.id) {
        console.error('Contact ID is missing');
        return;
      }

      this.apiContactsService.updateContact(updatedContact).subscribe(
        (updatedContact) => {

          const index = this.contacts.findIndex(c => c.id === updatedContact.id);
          if (index !== -1) {
            this.contacts[index] = updatedContact;
          }
          this.loadContacts();
          this.editingContact = null;
          this.editContactForm.reset();
        },
        (error) => {
          console.error('Error updating contact', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  cancelEdit(): void {
    this.editingContact = null;
    this.editContactForm.reset();
  }

  deleteContact(contactId: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.apiContactsService.deleteContact(contactId).subscribe(
        () => {
          this.contacts = this.contacts.filter(contact => contact.id !== contactId);
        },
        (error) => {
          console.error('Error deleting contact', error);
        }
      );
    }
  }

  hasErrors(controlName: string, errorType: string): boolean {
    const control = this.editContactForm.get(controlName);
    return control ? control.hasError(errorType) && control.touched : false;
  }
}
