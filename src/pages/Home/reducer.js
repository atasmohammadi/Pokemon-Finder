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
  list: {},
  error: false,
  success: false,
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POKEMONS:
        draft.loading = true;
        break;
      case LOAD_POKEMONS_SUCCESS:
        // API by default returns 100 rows. since we wanna cache the results
        // and also have the offline capability, instead of replacing the list
        // with results from API, we would append new data into existing one.
        // To avoid having duplicate entries array is converted to object.
        const pokemons = action.payload.pokemons.cards.reduce((obj, item) => {
          obj[item.id] = item;
          return obj;
        }, {});
        draft.list = Object.assign({}, state.list, pokemons);
        draft.success = true;
        draft.loading = false;
        draft.error = false;
        break;
      case LOAD_POKEMONS_FAILED:
        draft.error = action.payload.error;
        draft.success = false;
        draft.loading = false;
        break;
    }
  });

export default homeReducer;
