import {
  Component,
  OnInit,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SharedService } from 'src/app/services/sharedCallback.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  pokemonChange: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private sharedService: SharedService,
    public pokemonService: PokemonService,
    private fb: FormBuilder
  ) {
    this.pokemonChange = this.fb.group({
      name: ['', Validators.required],
      type: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  pokemon?: Pokemon;
  entry?: number;

  savePokemon(pokemonService: PokemonService, pokemon: Pokemon): void;
  savePokemon() {}

  onSubmit() {
    if (this.pokemonChange.valid) {
      const tmp = {
        id: this.pokemon?.id,
        name: this.pokemonChange.value.name,
        typePokemon: this.pokemonChange.value.type,
        description: this.pokemonChange.value.description,
      };
      this.savePokemon(this.pokemonService, tmp);
      this.bsModalRef.hide();
    }
  }

  ngOnInit() {
    this.sharedService.getCallback().subscribe((callback) => {
      if (callback) {
        this.savePokemon = callback;
      }
    });
  }
}
