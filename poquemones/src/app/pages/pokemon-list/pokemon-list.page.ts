import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ModalController } from '@ionic/angular';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PokemonListPage implements OnInit {
  pokemonList: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(
    private pokemonService: PokemonService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.pokemonService.pokemonList$.subscribe(pokemon => {
      this.pokemonList = pokemon;
      this.filteredPokemon = pokemon;
      this.isLoading = false;
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.filterPokemon();
  }

  filterPokemon() {
    if (!this.searchTerm.trim()) {
      this.filteredPokemon = this.pokemonList;
    } else {
      this.filteredPokemon = this.pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pokemon.type.some(type => type.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }

  async editPokemon(pokemon: Pokemon) {
    const { PokemonEditModalComponent } = await import('../../components/pokemon-edit-modal/pokemon-edit-modal.component');
    
    const modal = await this.modalController.create({
      component: PokemonEditModalComponent,
      componentProps: {
        pokemon: { ...pokemon }
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.pokemonService.updatePokemon(result.data);
      }
    });

    return await modal.present();
  }

  async deletePokemon(pokemon: Pokemon) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar a ${pokemon.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.pokemonService.deletePokemon(pokemon.id);
          }
        }
      ]
    });

    await alert.present();
  }

  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      fire: '#FF6B6B',
      water: '#4ECDC4',
      grass: '#45B7D1',
      electric: '#FFA07A',
      psychic: '#DDA0DD',
      ice: '#87CEEB',
      dragon: '#9370DB',
      dark: '#696969',
      fairy: '#FFB6C1',
      normal: '#D3D3D3',
      fighting: '#CD5C5C',
      poison: '#BA55D3',
      ground: '#F4A460',
      flying: '#87CEFA',
      bug: '#9ACD32',
      rock: '#A0522D',
      ghost: '#8A2BE2',
      steel: '#B0C4DE'
    };
    return colors[type] || '#95A5A6';
  }
}