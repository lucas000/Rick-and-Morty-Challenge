import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

class ChracterDetails extends Component {
  render() {
    const {params} = this.props.navigation.state;
    return (
      <View styles={styles.container}>
        <Image source={{uri: params.character.image}} style={styles.image} />
        <Text style={styles.property}>Specie: {params.character.species}</Text>
        <Text style={styles.property}>Status: {params.character.status}</Text>
        <Text style={styles.property}>Gender: {params.character.gender}</Text>
        <Text style={styles.property}>
          Origin: {params.character.origin.name}
        </Text>
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
  property: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
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
