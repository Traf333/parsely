import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';


class StatScreen extends React.Component {

  static navigationOptions = {
    title: 'hey',
  };

  render() {
    const {navigate, state} = this.props.navigation;
    return (
      <View>
        <Button title="Go to Main" onPress={() => navigate('Main') }/>
        <Text>Hello {state.name}</Text>
      </View>
    ); 
  }
}

export default StatScreen;