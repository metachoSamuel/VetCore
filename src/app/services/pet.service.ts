import { Injectable } from '@angular/core';
import {Pet} from "../interfaces/pet";
import {addDoc, collection, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
      private firestore: Firestore
  ) { }
  addPet(pet: Pet) {
    const petRef = collection(this.firestore, 'mascotas');
    return addDoc(petRef, pet);
  }
}
