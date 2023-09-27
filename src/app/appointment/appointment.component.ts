import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PetService} from "../services/pet.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit{
  formCit: FormGroup;
  constructor(
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

  onSubmit() {
    console.log(this.formCit.value);
    this.petService.addPet(this.formCit.value)
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error));
  }
}
