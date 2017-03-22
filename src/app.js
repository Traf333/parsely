import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  TouchableHighlight,
  ToastAndroid,
  Button,
  PermissionsAndroid,
  Navigator,
  Text,
  Image,
  View
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <Navigator
        styles={styles.navigator}
        initialRoute={{
          title: 'Главная',
          component: Home
        }}
        renderScene={(route, navigator) => <Home title={route.title} /> }
      />
    )
  }
}

const Home = ({title}) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Helo #{title}</Text>
    <Text style={styles.welcome}>Helo #{title}</Text>
  </View>
)


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

  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});
