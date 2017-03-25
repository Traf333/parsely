import React, {Component} from 'react';
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

class MainScreen extends React.Component {
  static navigationOptions = {title: 'Welcome',};

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Text>Main Screen</Text>
        <Button title="Go to stat" onPress={() => navigate('Stat') }/>
        <Button title="Stat with params" onPress={() => navigate('Stat', {name: 'Jane'}) }/>
        <Button title="Go to ds" onPress={() => navigate(fds, {name: 'Jane'}) }/>
      </View>
    );
  }
}

export default MainScreen;