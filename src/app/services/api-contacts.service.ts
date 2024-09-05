import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacts } from '../models/contacts.model';

@Injectable({
  providedIn: 'root'
})

export class ApiContactsService {
  private apiUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) { }

  // Obtener todos los contactos
  getContacts(): Observable<Contacts[]> {
    return this.http.get<Contacts[]>(`${this.apiUrl}/contacts`);
  }

  // Obtener un contacto por ID
  getContact(id: number): Observable<Contacts> {
    return this.http.get<Contacts>(`${this.apiUrl}/contacts/${id}`);
  }

  // Agregar un nuevo contacto
  addContact(contact: Contacts): Observable<Contacts> {
    return this.http.post<Contacts>(`${this.apiUrl}/contacts`, contact);
  }

  // Actualizar un contacto
  updateContact(contact: Contacts): Observable<Contacts> {
    // Asegúrate de que el ID esté presente en la URL
    if (!contact.id) {
      console.error('Contact ID is undefined');
      throw new Error('Contact ID is undefined');
    }
    return this.http.put<Contacts>(`${this.apiUrl}/contacts/${contact.id}`, contact);
  }

  // Eliminar un contacto
  deleteContact(id: number): Observable<Contacts> {
    return this.http.delete<Contacts>(`${this.apiUrl}/contacts/${id}`);
  }
}
