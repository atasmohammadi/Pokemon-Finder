import { call, put, takeLatest } from 'redux-saga/effects';
import { baseUrl } from '../../constants';
import request from '../../utils/request';
import objectToParams from '../../utils/objectToParams';

import {
  LOAD_POKEMONS,
} from './constants';

import {
  loadPokemonsFailed,
  loadPokemonsSuccess,
} from './actions';

const endpoint = {
  cards: '/cards',
};

function* loadPokemons({ payload: {} }) {
  const params = {};
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const requestURL = `${baseUrl}${endpoint.cards}?${objectToParams(params)}`;
  try {
    const { data } = yield call(request, requestURL, options);
    yield put(loadPokemonsSuccess(data));
  } catch (error) {
    yield put(loadPokemonsFailed(error.errors));
  }
}

export default function* HomeSaga() {
  yield takeLatest(LOAD_POKEMONS, loadPokemons);
}
