import { Component, OnInit } from '@angular/core'; 
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/users.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  // Esto es para el responsive del Navbar.
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  formularioLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService ) {
    this.formularioLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  enviarLogin() {
    if (this.formularioLogin.valid) {
      const { email, password } = this.formularioLogin.value;
      console.log(email, password);

      this.userService.login(email, password).subscribe(
        response => {
          console.log('Login successful:', response);
          alert('Login successfull');
          this.router.navigate(['/dashboard-user']);
        },
        error => {
          console.error('Error during login:', error);
          alert('Invalid email or password');
        }
      );
    }
  }

  hasErrors(controlName: string, errorType: string) {
    const control = this.formularioLogin.get(controlName);
    return control?.hasError(errorType) && control?.touched;
  }
}

