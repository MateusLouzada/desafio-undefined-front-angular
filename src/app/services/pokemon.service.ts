import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  url = 'https://localhost:44390/api/pokemon';

  constructor(private httpClient: HttpClient) {}

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // }

  async getPokemons(): Promise<Pokemon[]> {
    return await axios
      .get(this.url)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  async insertPokemon(pokemon: Pokemon): Promise<Pokemon> {
    return await axios
      .post(this.url, pokemon)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  async updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    console.log(pokemon);
    const tmp = {
      name: pokemon.name,
      description: pokemon.description,
      typePokemon: pokemon.typePokemon,
    };
    return await axios
      .put(this.url + '?id=' + pokemon.id, tmp)
      .then((res) => {
        //console.log(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  async deletePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return await axios
      .delete(this.url + '/' + pokemon.id)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }

  // getPokemons(): Observable<Pokemon[]> {
  //   return this.httpClient.get<Pokemon[]>(this.url)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError))
  // }

  // insertPokemon(pokemon: Pokemon): Observable<Pokemon> {
  //   return this.httpClient.post<Pokemon>(this.url, JSON.stringify(pokemon), this.httpOptions)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }

  // updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
  //   return this.httpClient.put<Pokemon>(this.url + '/' + pokemon.id, JSON.stringify(pokemon), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  // }

  // deletePokemon(pokemon: Pokemon) {
  //   return this.httpClient.delete<Pokemon>(this.url + '/' + pokemon.id, this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  // }

  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Erro ocorreu no lado do client
  //     errorMessage = error.error.message;
  //   } else {
  //     // Erro ocorreu no lado do servidor
  //     errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // };
}
