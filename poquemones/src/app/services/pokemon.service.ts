import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private pokemonListSubject = new BehaviorSubject<Pokemon[]>([]);
  public pokemonList$ = this.pokemonListSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialPokemon();
  }

  private loadInitialPokemon(): void {
    this.getPokemonList(50).subscribe(pokemon => {
      this.pokemonListSubject.next(pokemon);
    });
  }

  getPokemonList(limit: number = 50): Observable<Pokemon[]> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}`)
      .pipe(
        switchMap(response => {
          const pokemonRequests = response.results.map(pokemon => 
            this.getPokemonDetails(pokemon.name)
          );
          return forkJoin(pokemonRequests);
        })
      );
  }

  getPokemonDetails(nameOrId: string | number): Observable<Pokemon> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${nameOrId}`)
      .pipe(
        map(data => ({
          id: data.id,
          name: data.name,
          type: data.types.map((t: any) => t.type.name),
          height: data.height,
          weight: data.weight,
          image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
          abilities: data.abilities.map((a: any) => a.ability.name)
        }))
      );
  }

  searchPokemon(query: string): Observable<Pokemon[]> {
    return this.pokemonList$.pipe(
      map(pokemon => 
        pokemon.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.type.some(type => type.toLowerCase().includes(query.toLowerCase()))
        )
      )
    );
  }

  updatePokemon(updatedPokemon: Pokemon): void {
    const currentList = this.pokemonListSubject.value;
    const index = currentList.findIndex(p => p.id === updatedPokemon.id);
    if (index !== -1) {
      currentList[index] = updatedPokemon;
      this.pokemonListSubject.next([...currentList]);
    }
  }

  deletePokemon(id: number): void {
    const currentList = this.pokemonListSubject.value;
    const filteredList = currentList.filter(p => p.id !== id);
    this.pokemonListSubject.next(filteredList);
  }
}