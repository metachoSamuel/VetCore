import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PetService} from "../services/pet.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit{
  formCit: FormGroup;
  constructor(
      private router: Router,
      private petService: PetService
  ) {
    this.formCit = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      petName: new FormControl(),
      agePet: new FormControl(),
      raza: new FormControl(),
    })
  }

  ngOnInit(): void {
  }
  navigateToHome() {
    this.router.navigate(['/home']); // Navegar al componente HomeComponent
  }

  onSubmit() {
    console.log(this.formCit.value);
    this.petService.addPet(this.formCit.value)
        .then(response => {
          console.log(response);
          Swal.fire(
            'Cita agendada',
            '',
            'success'
          )
          this.navigateToHome()
        })
      .catch(error => {
        console.log(error),
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se puede agendar la cita'
          })
      });
  }
}
