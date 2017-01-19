/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Navigator,
  Text,
  Image,
  View
} from 'react-native';

export default class parsely extends Component {
  render() {
    let pic = {
      uri: 'http://www.gourmetgarden.com/sites/gourmetgarden.sites.go1.com.au/files/atp_gen_gourm_0210_115_parsley.jpg'
    };
    return (

      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Parsley App!
        </Text>
        <Image source={pic} style={{width: 300, height: 300}}/>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

export  class MyScene extends Component {
  static get defaultProps() {
    return {
      title: 'MyScene'
    };
  }

  render() {
    return (
        <View>
          <Text>Current Scene: {this.props.title}</Text>

          <TouchableHighlight onPress={this.props.onForward}>
            <Text>Tap me to load the next scene</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={this.props.onBack}>
            <Text>Tap me to go back</Text>
          </TouchableHighlight>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('parsely', () => parsely);
