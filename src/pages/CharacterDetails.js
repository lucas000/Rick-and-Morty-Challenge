import React, {Component} from 'react';
import {View, Text, Image, YellowBox, StyleSheet} from 'react-native';
import {colors, fonts, metrics} from '../styles/index';

YellowBox.ignoreWarnings(['Warning: Failed']);
console.ignoredYellowBox = ['Warning: ReactNative.createElement'];

class ChracterDetails extends Component {
  render() {
    const {params} = this.props.navigation.state;
    return (
      <View styles={styles.container}>
        <Image source={{uri: params.character.image}} style={styles.image} />
        <Text style={styles.texts}>Specie: {params.character.species}</Text>
        <Text style={styles.texts}>Status: {params.character.status}</Text>
        <Text style={styles.texts}>Gender: {params.character.gender}</Text>
        <Text style={styles.texts}>Origin: {params.character.origin.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  texts: {
    fontSize: fonts.regular,
    padding: metrics.baseMargin,
    fontWeight: 'bold',
    color: colors.dark,
  },

  image: {
    width: '95%',
    height: '50%',
    paddingLeft: 10,
    margin: 8,
    borderRadius: 7,
  },
});
export default ChracterDetails;
