import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import api from '../services/api';

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

    const response = await api.get(`/character/?page=${page}`);
    const {results, ...resultsInfo} = response.data;

    this.setState({
      results: [...this.state.results, ...results],
      resultsInfo,
      page,
      loading: false,
    });
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
      <View style={styles.loading}>
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
    backgroundColor: '#f3f2f2',
  },
  flatList: {
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 12,
    marginBottom: 40,
  },

  item: {
    flex: 1,
    flexDirection: 'column',
  },

  listItem: {
    backgroundColor: '#99ccff',
    marginTop: 10,
  },
  image: {
    width: '50%',
    height: 100,
    margin: 8,
    borderRadius: 7,
  },
  name: {
    width: '50%',
    textAlignVertical: 'center',
    marginLeft: 10,
    marginBottom: 10,
    color: '#000',
  },
});
