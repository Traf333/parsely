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
  TextInput,
  Image,
  View
} from 'react-native';

import Voice from 'react-native-voice';
import VoiceRecognise from '../VoiceRecognise';


const buildItem = value => {
  date = new Date
  return {
    id: String(date.getTime()),
    value: value,
    created_at: date
  }
}
const saveItem = item => storage.save({key: 'item', id: item.id, rawData: item})

class MainScreen extends React.Component {
  static navigationOptions = {title: 'Parsely',};

  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
      text: ''
    };
    // Voice.onSpeechStart = this.onSpeechStart.bind(this);
    // Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    // Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    // Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    // Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    // Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
    this.clear = this.clear.bind(this)
  }

  componentDidMount() {
    storage.getAllDataForKey('item').then(items => this.setState({results: items}))
  }

  clear() {
    storage.clearMapForKey('item')
    this.setState({results: []})
  }

  onSpeechResults(e) {
    text = e.value[0]
    ToastAndroid.show(e.value.join("\n"), ToastAndroid.LONG)

    text ? this.submit(text) : ToastAndroid.show("Не понятно", ToastAndroid.LONG)
    // ToastAndroid.show(e.value[0], ToastAndroid.LONG)
  }

  startRecognizing(e) {
    // this.setState({
    //   recognized: '',
    //   pitch: '',
    //   error: '',
    //   started: '',
    //   results: [],
    //   partialResults: [],
    // });
    const error = Voice.start('ru');
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }

  stopRecognizing(e) {
    const error = Voice.stop();
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }

  submit(value) {
    const item = buildItem(value)
    saveItem(item)
    this.setState({text: '', results: [...this.state.results, item]})
    this._input.blur()
  }


  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button title="Set Value" onPress={(e) => this.startRecognizing(e) }/>
        <Button title="Stat params" onPress={() => navigate(jghfj, {name: 'Jane'}) }/>
        <TouchableHighlight onPress={this.stopRecognizing.bind(this)}>
          <Text
            style={styles.action}>
            Stop Recognizing
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onLongPress={(e) => this.startRecognizing(e)}>
          <Text style={styles.stat}>Start Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.clear}>
          <Text style={styles.stat}>Clear</Text>
        </TouchableHighlight>
        <Text
          style={styles.stat}>
          Results
        </Text>
        {this.state.results.map(item => {
          return (
            <Text
              key={`result-${item.id}`}
              style={styles.stat}>
              {item.value}
            </Text>
          )
        })}
        <TextInput onChangeText={text => this.setState({text})}
                   onSubmitEditing={e => this.submit(e.nativeEvent.text)}
                   value={this.state.text}
                   blurOnSubmit={true}
                   ref={input => this._input = input}
        />
      </View>
    );
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

  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  stat: {
    // textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});


export default MainScreen;