/*
 *
 * Home actions
 *
 */

import {
  LOAD_POKEMONS,
  LOAD_POKEMONS_SUCCESS,
  LOAD_POKEMONS_FAILED,
} from './constants';

export const loadPokemons = (query) => ({
  type: LOAD_POKEMONS,
  payload: {query},
});

export const loadPokemonsSuccess = (pokemons) => ({
  type: LOAD_POKEMONS_SUCCESS,
  payload: {pokemons},
});

export const loadPokemonsFailed = (error) => ({
  type: LOAD_POKEMONS_FAILED,
  payload: error,
});
