import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pokemon } from './models/pokemon';
import { PokemonService } from './services/pokemon.service';
import { ModalComponent } from './components/modal/modal.component';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SharedService } from './services/sharedCallback.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pokemon = {} as Pokemon;
  pokemons: Pokemon[] | any = [];


  bsModalRef?: BsModalRef;

  constructor(
    private pokemonService: PokemonService,
    private modalService: BsModalService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  openModalWithComponent(entry: number, pokemon?: Pokemon) {
    const initialState: ModalOptions = {
      initialState: {
        pokemon: pokemon,
        entry: entry
      },
    };
    this.bsModalRef = this.modalService.show(ModalComponent, initialState);
    this.sharedService.sendCallback(this.savePokemon);
  }

  async getPokemons() {
    this.pokemons = await this.pokemonService.getPokemons();
  }

  async savePokemon(pokemonService: PokemonService, pokemon: Pokemon) {

    if (pokemon.id !== undefined) {
      await pokemonService.updatePokemon(pokemon);
      this.pokemons = await pokemonService.getPokemons();
      location.reload();
    } else {
      await pokemonService.insertPokemon(pokemon);
      this.pokemons = await pokemonService.getPokemons();
      location.reload();
    }
  }

  async deletePokemon(pokemon: Pokemon) {
    await this.pokemonService.deletePokemon(pokemon);
    this.pokemons = await this.pokemonService.getPokemons();
  }


  title = 'desafio-undefined-angular';
}
