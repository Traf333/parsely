import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

const title = ({state}) => {
  let message = 'Statistic'
  if (state.params && state.params.name) {
    message = message + ' ' + state.params.name
  }
  return message
}

class StatScreen extends React.Component {

  static navigationOptions = {
    title: title,
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