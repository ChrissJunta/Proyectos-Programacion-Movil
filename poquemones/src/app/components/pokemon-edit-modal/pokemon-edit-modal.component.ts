import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-edit-modal',
  templateUrl: './pokemon-edit-modal.component.html',
  styleUrls: ['./pokemon-edit-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PokemonEditModalComponent {
  @Input() pokemon!: Pokemon;
  
  editedPokemon: Pokemon = {
    id: 0,
    name: '',
    type: [],
    height: 0,
    weight: 0,
    image: '',
    abilities: []
  };

  newType: string = '';
  newAbility: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.editedPokemon = { ...this.pokemon };
  }

  addType() {
    if (this.newType.trim() && !this.editedPokemon.type.includes(this.newType.trim().toLowerCase())) {
      this.editedPokemon.type.push(this.newType.trim().toLowerCase());
      this.newType = '';
    }
  }

  removeType(index: number) {
    this.editedPokemon.type.splice(index, 1);
  }

  addAbility() {
    if (this.newAbility.trim() && !this.editedPokemon.abilities.includes(this.newAbility.trim().toLowerCase())) {
      this.editedPokemon.abilities.push(this.newAbility.trim().toLowerCase());
      this.newAbility = '';
    }
  }

  removeAbility(index: number) {
    this.editedPokemon.abilities.splice(index, 1);
  }

  save() {
    this.modalController.dismiss(this.editedPokemon);
  }

  cancel() {
    this.modalController.dismiss();
  }
}