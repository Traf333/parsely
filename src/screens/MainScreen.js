import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
  Button,
  PermissionsAndroid,
  Navigator,
  Text,
  TextInput,
  ScrollView,
  Image,
  WithLabel,
  View
} from 'react-native';
import Voice from 'react-native-voice';

import VoiceRecognise from '../VoiceRecognise';
import {parseText, buildItem} from "../utils";


const saveItem = item => storage.save({key: 'item', id: item.id, rawData: item})


class MainScreen extends React.Component {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
    text: ''
  };

  static navigationOptions = {title: 'Parsely',};

  componentDidMount() {
    storage.getAllDataForKey('item').then(items => this.setState({results: items}))
    Voice.onSpeechResults = this.onSpeechResults;
  }

  clear = () => {
    storage.clearMapForKey('item')
    this.setState({results: []})
  }

  onSpeechResults = (e) => {
    text = e.value[0]
    ToastAndroid.show(e.value.join("\n"), ToastAndroid.LONG)

    text ? this.submit(text) : ToastAndroid.show("Не понятно", ToastAndroid.LONG)
    // ToastAndroid.show(e.value[0], ToastAndroid.LONG)
  }

  startRecognizing = (e) => {
    const error = Voice.start('ru');
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }

  stopRecognizing = (e) => {
    const error = Voice.stop();
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }

  submit = (text) => {
    // const text = e.nativeEvent.text
    const {error, ...data} = parseText(text)
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT)
      return
    }
    const item = buildItem(data)
    saveItem(item)
    this.setState({text: '', results: [...this.state.results, item]})
    this._input.blur()
  }

  actionButton() {
    if (this.state.text) {
      return (
          <TouchableOpacity 
            onPress={e => this.submit(this.state.text)}
            style={styles.sendButton}>
            <Image source={require('../images/send.png')} />
          </TouchableOpacity>
          )
    }

    return (
      <TouchableOpacity 
        onPress={this.startRecognizing}
        style={styles.sendButton}>
        <Image source={require('../images/microphone.png')} />
      </TouchableOpacity>
    )

  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>

          {/*<Button title="Stat params" onPress={() => navigate(jghfj, {name: 'Jane'}) }/>*/}
          {this.state.results.map(item => {
            return (
              <Text
                key={`result-${item.id}`}
                style={styles.item}>
                {item.category} {item.value}
              </Text>
            )
          })}
        </ScrollView>
        <View>
          <TextInput onChangeText={text => this.setState({text})}
                     onSubmitEditing={e => this.submit(e.nativeEvent.text)}
                     value={this.state.text}
                     blurOnSubmit={true}
                     ref={input => this._input = input}
                     style={styles.input}
                     placeholderTextColor="#ccc"
                     placeholder="На что потратили?"
          />

          {this.actionButton()}
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  item: {
    marginLeft: 10,
    color: '#222',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 3,
  },
  input: {
    fontSize: 13,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginRight: 50
  },
  sendButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
});


export default MainScreen;