/*
 *
 * Home reducer
 *
 */

import produce from 'immer';
import {
  LOAD_POKEMONS,
  LOAD_POKEMONS_SUCCESS,
  LOAD_POKEMONS_FAILED,
} from './constants';

export const initialState = {
  list: [],
  error: false,
  success: false,
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_POKEMONS:
        draft.loading = true;
        break;
      case LOAD_POKEMONS_SUCCESS:
        draft.list = action.payload.pokemons;
        draft.success = true;
        draft.loading = false;
        draft.error = false;
        break;
      case LOAD_POKEMONS_FAILED:
        draft.error = action.payload;
        draft.success = false;
        draft.loading = false;
        break;
    }
  });

export default homeReducer;
