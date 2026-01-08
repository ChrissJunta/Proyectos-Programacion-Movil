export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  height: number;
  weight: number;
  image: string;
  abilities: string[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBasic[];
}

export interface PokemonBasic {
  name: string;
  url: string;
}