import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import Swal from "sweetalert2";
import Sweet from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;
  constructor(
      private router: Router,
      private userService: UserService
  ) {
    this.formReg = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    })
  }

  isStrongPassword(password: string) {
    const lengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;

    return (
      lengthRegex.test(password) &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      digitRegex.test(password)
    );
  }
  ngOnInit(): void {
  }
  navigateToLogin() {
    this.router.navigate(['/login']); // Navegar al componente LoginComponent
  }

  onSubmit() {
    if(!this.isStrongPassword(this.formReg.get('password')?.value)) {
      Sweet.fire({icon: 'error', title: 'Oops...',
        text: 'La contrasena debe tener:\n' +
          'al menos 8 caracteres\n' +
          'al menos una letra mayúscula\n' +
          'al menos una letra minúscula\n' +
          'al menos un dígito'})
      return;
    }
    this.userService.register(this.formReg.value)
      .then(response => {
        Sweet.fire('User register successfully', '', 'success')
        const { password, ...formValues } = this.formReg.value
        this.userService.addUser(formValues).then(r => {})
        this.router.navigate(['/home']).then(r => {});
      })
      .catch(error => {
        console.log(error)
        Sweet.fire({icon: 'error', title: 'Oops...', text: 'No se registro '})
      });

    console.log(this.formReg.value);
    this.userService.register(this.formReg.value)
        .then(response => {
          Swal.fire(
            'User register successfully',
            '',
            'success'
          )
          const { password, ...formValues } = this.formReg.value
          this.userService.addUser(formValues)
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.log(error),
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email/Password no cumple el formato'
            })
        });
  }
}
