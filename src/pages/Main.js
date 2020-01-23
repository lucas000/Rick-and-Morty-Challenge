import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
  YellowBox,
} from 'react-native';

YellowBox.ignoreWarnings(['Warning: Failed']);
console.ignoredYellowBox = ['Warning: ReactNative.createElement'];

import api from '../services/api';
import {colors, fonts, metrics} from '../styles/index';

export default class Main extends Component {
  state = {
    resultsInfo: {},
    results: [],
    page: 1,
    loading: false,
  };

  componentDidMount() {
    this.loadCharacters();
  }

  loadCharacters = async (page = 1) => {
    if (this.state.loading) {
      return;
    }

    this.setState({loading: true});

    try {
      const response = await api.get(`/character/?page=${page}`);
      const {results, ...resultsInfo} = response.data;

      this.setState({
        results: [...this.state.results, ...results],
        resultsInfo,
        page,
        loading: false,
      });
    } catch (err) {
      Alert.alert(
        'Connection failed',
        'Check your network',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  loadMore = () => {
    const {page, resultsInfo} = this.state;

    if (page === resultsInfo.page) {
      return;
    }

    const pageNumber = page + 1;

    this.loadCharacters(pageNumber);
  };
  renderItem = ({item}) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          this.props.navigation.navigate('CharacterDetails', {character: item});
        }}>
        <View style={styles.item}>
          <Image source={{uri: item.image}} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }
    return (
      <View style={styles.loadPage}>
        <ActivityIndicator />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.list}
          data={this.state.results}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.35}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundcolor,
  },

  list: {
    paddingHorizontal: metrics.paddingHorizontal,
    marginBottom: metrics.baseMargin,
  },

  item: {
    flex: 1,
    flexDirection: 'row',
  },

  listItem: {
    backgroundColor: colors.backgroundcolor,
  },

  image: {
    width: '20%',
    height: 50,
    marginTop: metrics.baseMargin,
    marginLeft: metrics.baseMargin,
    borderRadius: metrics.baseRadius,
  },

  name: {
    textAlignVertical: 'center',
    color: '#000',
    fontSize: fonts.big,
    marginLeft: metrics.baseMargin,
  },

  loadPage: {
    color: colors.dark,
  },
});
