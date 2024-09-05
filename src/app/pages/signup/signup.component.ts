import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPasswords } from '../../utils/matchValidator';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {

  // Esto es para el responsive del Navbar.
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Formulario reactivo para el Sign-Up.
  formularioSignUp: FormGroup;

  constructor(private form: FormBuilder, private router: Router, private userService: UserService) {
    this.formularioSignUp = this.form.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      passwordGroup: this.form.group(
        {
          password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
          repeatPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
        },
        { validators: matchPasswords('password', 'repeatPassword') }
      )
    })
  }

  enviarSignUp() {
    if (this.formularioSignUp.valid) {
      const { name, email, passwordGroup } = this.formularioSignUp.value;
      console.log(name, email, passwordGroup)
      const user = {
        name,
        email,
        password: passwordGroup.password
      };

      // Enviar datos al servicio
      this.userService.createUser(user).subscribe(
        response => {
          console.log('Usuario registrado:', response);
          this.formularioSignUp.reset();
          alert('Se ha registrado exitosamente');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error al registrar usuario:', error);
          alert('The user could not be created');
        }
      );
    }
  }

  hasErrors(controlName: string, errorType: string, groupName: string = '') {
    const control = groupName
      ? (this.formularioSignUp.get(groupName) as FormGroup).get(controlName)
      : this.formularioSignUp.get(controlName);

    return control?.hasError(errorType) && control.touched;
  }
}

