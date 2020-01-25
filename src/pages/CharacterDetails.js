import React, {Component} from 'react';
import {View, Text, Image, YellowBox, StyleSheet} from 'react-native';
import {colors, fonts, metrics} from '../styles/index';
import {
  listenOrientationChange as loc,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
YellowBox.ignoreWarnings(['Warning: Failed']);
console.ignoredYellowBox = ['Warning: ReactNative.createElement'];

class ChracterDetails extends Component {
  componentDidMount() {
    loc(this);
  }

  componentWillUnMount() {
    rol();
  }
  render() {
    const {params} = this.props.navigation.state;
    return (
      <View styles={styles.container}>
        <View styles={styles.imageContainer}>
          <Image source={{uri: params.character.image}} style={styles.image} />
          <Text style={styles.texts}>Specie: {params.character.species}</Text>
          <Text style={styles.texts}>Status: {params.character.status}</Text>
          <Text style={styles.texts}>Gender: {params.character.gender}</Text>
          <Text style={styles.texts}>
            Origin: {params.character.origin.name}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.backgroundcolor,
  },
  texts: {
    fontSize: fonts.big,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: '1%',
    marginLeft: metrics.smallMargin,
  },

  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.backgroundcolor,
    alignItems: 'center',
  },

  image: {
    height: '50%',
    marginTop: metrics.smallMargin,
    marginLeft: metrics.smallMargin,
    marginRight: metrics.smallMargin,
    borderRadius: 7,
  },
});
export default ChracterDetails;
