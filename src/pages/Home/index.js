import React, {memo, useEffect, useState} from 'react';
import {SafeAreaView, FlatList, View, Text, Image} from 'react-native';

import {SearchBar} from 'react-native-elements';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import {useInjectSaga} from '../../utils/injectSaga';
import {filterPokemonsList} from './helpers';
import * as actions from './actions';
import styles from './styles';

import {
  makeSelectLoading,
  makeSelectList,
  makeSelectError,
  makeSelectSuccess,
} from './selectors';
import saga from './saga';

function Home({loadPokemons, pokemons}) {
  useInjectSaga({key: 'Home', saga});
  const [searchQuery, updateSearchQuery] = useState('');

  // Load pokemons when component mounts
  useEffect(() => {
    loadPokemons();
  }, []);

  // Re-load pokemons when search query changes
  useEffect(() => {
    if (!searchQuery) return;
    loadPokemons({name: searchQuery.toLowerCase()});
    loadPokemons({types: searchQuery}); // Unlike Name attribute, Types is an array and API would return results only if it's exact match, so no lower-casing
  }, [searchQuery]);

  function renderItem({item}) {
    return (
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.itemImage}
            source={{
              uri: item.imageUrl,
            }}
          />
        </View>
        <View style={styles.descriptionContainer}>
          {item.name && (
            <View style={styles.row}>
              <Text style={styles.title}>Name: </Text>
              <Text style={styles.desc}>{item.name}</Text>
            </View>
          )}
          {item.hp && (
            <View style={styles.row}>
              <Text style={styles.title}>HP: </Text>
              <Text style={styles.desc}>{item.hp}</Text>
            </View>
          )}
          {item.nationalPokedexNumber && (
            <View style={styles.row}>
              <Text style={styles.title}>Pokedex: </Text>
              <Text style={styles.desc}>{item.nationalPokedexNumber}</Text>
            </View>
          )}
          {item.types && (
            <View style={styles.row}>
              <Text style={styles.title}>Type: </Text>
              <Text style={styles.desc}>{item.types.join(', ')}</Text>
            </View>
          )}
          {item.weaknesses && (
            <View style={styles.row}>
              <Text style={styles.title}>Weaknesses: </Text>
              <Text style={styles.desc}>
                {item.weaknesses
                  .map((weakness) => `${weakness.type} ${weakness.value}`)
                  .join(', ')}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  const pokemonsArray = Object.values(pokemons);
  let filteredPokemonsArray = filterPokemonsList(pokemonsArray, searchQuery);
  filteredPokemonsArray = [...filteredPokemonsArray].sort(
    (a, b) => b.hp - a.hp, // order by highest HP
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Pokemon Type or Name..."
          onChangeText={updateSearchQuery}
          value={searchQuery}
        />
        <FlatList
          data={filteredPokemonsArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={filteredPokemonsArray} // to force re-render flatlist when source data has changed.
        />
      </SafeAreaView>
    </>
  );
}

Home.propTypes = {
  pokemons: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
  loadPokemons: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pokemons: makeSelectList(),
  loading: makeSelectLoading(), // to show loading indicator, not applied to current example.
  error: makeSelectError(), // to show error, not applied to current example.
  success: makeSelectSuccess(), // to show success alert, not applied to current example.
});

function mapDispatchToProps(dispatch) {
  return {
    loadPokemons: (...payload) => dispatch(actions.loadPokemons(...payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Home);
