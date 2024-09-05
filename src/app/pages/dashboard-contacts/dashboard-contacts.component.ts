import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import { ApiContactsService } from '../../services/api-contacts.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-contacts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './dashboard-contacts.component.html',
  styleUrl: './dashboard-contacts.component.css'
})

export class DashboardContactsComponent {

  // Formulario reactivo para el Sign-Up.
  formularioCreateContact: FormGroup;

  constructor(private form: FormBuilder, private router: Router, private apiContactsService: ApiContactsService) {
    this.formularioCreateContact = this.form.group({
      name: ['', [Validators.required]],
      email: ['', Validators.email],
      phone: ['', [Validators.required]],
      address: [''],
      description: ['']
    })
  }

  enviarCreateContact() {
    if (this.formularioCreateContact.valid) {
      const { name, email, phone, address, description } = this.formularioCreateContact.value;
      console.log(name, email, phone, address, description);
      const contact = {
        name,
        email,
        phone,
        address,
        description
      };

      this.apiContactsService.addContact(contact).subscribe(
        response => {
          console.log('Contact created successfully:', response);
          alert('Contact created successfully');
          this.router.navigate(['/dashboard-user']);
        },
        error => {
          console.error('Error during Creating Contact:', error);
          alert('Contact not created');
        }
      );
    }
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formularioCreateContact?.get(controlName)?.hasError(errorType) && this.formularioCreateContact.get(controlName)?.touched
  }
}