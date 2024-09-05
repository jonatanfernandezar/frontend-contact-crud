import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiContactsService } from '../../services/api-contacts.service';
import { Contacts } from '../../models/contacts.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'] // Corregido 'styleUrl' a 'styleUrls'
})

export class EditContactComponent {
  /*formularioEditContact: FormGroup;
  selectedContact: Contacts | null = null; 

  constructor(private form: FormBuilder, private router: Router, private apiContactsService: ApiContactsService) {
    this.formularioEditContact = this.form.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', Validators.email],
      phone: ['', [Validators.required]],
      address: [''],
      description: ['']
    });
  }

  selectContactForEdit(contact: Contacts) {
    this.selectedContact = contact;
    this.formularioEditContact.patchValue(contact);
  }

  enviarEditContact() {
    if (this.formularioEditContact.valid && this.selectedContact) {
      const updatedContact = { ...this.formularioEditContact.value };

      if (this.selectedContact.id !== undefined) {
        this.apiContactsService.updateContact(this.selectedContact.id, updatedContact).subscribe(
          () => {
            console.log('Contact updated successfully');
            alert('Contact updated successfully');
            this.selectedContact = null;
            this.formularioEditContact.reset();
            this.router.navigate(['/dashboard-user']);
          },
          error => {
            console.error('Error updating contact:', error);
            alert('Error updating contact');
          }
        );
      } else {
        console.error('Selected contact ID is undefined');
        alert('Unable to update contact');
      }
    }
  }

  // Método para eliminar un contacto
  deleteContact(id: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.apiContactsService.deleteContact(id).subscribe(
        () => {
          console.log('Contact deleted successfully');
          alert('Contact deleted successfully');
          this.router.navigate(['/dashboard-user']);
        },
        error => {
          console.error('Error deleting contact:', error);
          alert('Error deleting contact');
        }
      );
    }
  }

  // Método para verificar errores en el formulario
  hasErrors(controlName: string, errorType: string): boolean {
    const control = this.formularioEditContact.get(controlName);
    return control ? control.hasError(errorType) && control.touched : false;
  }*/
}
