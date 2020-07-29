import React, {memo, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, StatusBar} from 'react-native';

import {SearchBar} from 'react-native-elements';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import {useInjectSaga} from '../../utils/injectSaga';
import * as actions from './actions';
import * as constants from './constants';
import styles from './styles';

import {
  makeSelectLoading,
  makeSelectList,
  makeSelectError,
  makeSelectSuccess,
} from './selectors';
import saga from './saga';

function Home({loadPokemons}) {
  useInjectSaga({key: 'Home', saga});
  const [searchQuery, updateSearchQuery] = useState('');

  useEffect(() => {
    loadPokemons();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearchQuery}
            value={searchQuery}
          />
        </ScrollView>
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
  loading: makeSelectLoading(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPokemons: (...payload) => dispatch(actions.loadPokemons(...payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Home);
