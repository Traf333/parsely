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


  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <Button title="Set Value" onPress={this.startRecognizing}/>
          <Button title="Stat params" onPress={() => navigate(jghfj, {name: 'Jane'}) }/>
          <TouchableHighlight onPress={this.stopRecognizing}>
            <Text
              style={styles.action}>
              Stop Recognizing
            </Text>
          </TouchableHighlight>
          <TouchableOpacity onLongPress={this.startRecognizing} onPressOut={this.stopRecognizing}>
            <Text style={styles.action}>Start Recognizing</Text>
          </TouchableOpacity>
          <TouchableHighlight onPress={this.clear}>
            <Text style={styles.action}>Clear</Text>
          </TouchableHighlight>
          <Text
            style={styles.stat}>
            Results
          </Text>
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

          <TouchableHighlight>
            <Text></Text>
          </TouchableHighlight>
        </View>

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
    marginLeft: 10,
    marginBottom: 3,
  },
  item: {
    marginLeft: 10,
    color: '#222',
    paddingBottom: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 3,
  },
  input: {
    fontSize: 13,
    fontWeight: 'bold',
    marginHorizontal: 10
  }
});


export default MainScreen;