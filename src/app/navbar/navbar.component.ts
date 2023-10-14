import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
      private router: Router,
      private userService: UserService
  ) {
  }

  logOut() {
      Swal.fire({
          title: '¿Quieres cerrar sesion?',
          showDenyButton: true,
          confirmButtonText: 'Salir',
          denyButtonText: `No salir`,
      }).then((result) => {
          if (result.isConfirmed) {
              this.userService.logout().then(r => {})
              this.router.navigate(['/login']).then(r => {});
          }
      })
  }
}
