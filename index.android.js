/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
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

import Voice from 'react-native-voice';


export default class parsely extends Component {
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
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
  }
  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }
  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }
  onSpeechEnd(e) {
    this.setState({
      end: '√',
    });
  }
  onSpeechError(e) {
    this.setState({
      error: e.error,
    });
  }
  onSpeechResults(e) {
    console.log(e)
    this.setState({
      results: e.value,
    });
  }
  onSpeechPartialResults(e) {
    this.setState({
      partialResults: e.value,
    });
  }
  onSpeechVolumeChanged(e) {
    this.setState({
      pitch: e.value,
    });
  }
  _startRecognizing(e) {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
    });
    const error = Voice.start('en');
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }
  _stopRecognizing(e) {
    console.log('stopping')
    const error = Voice.stop();
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }
  _cancelRecognizing(e) {
    const error = Voice.cancel();
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }
  _destroyRecognizer(e) {
    const error = Voice.destroy();
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }
  render() {
    const onPress = () => {

      var spokenText = Voice.startSpeech("Speak yo", SpeechAndroid.DEFAULT);
      spokenText.then(abc => console.log(abc))
      // ToastAndroid.show(spokenText , ToastAndroid.LONG);
      ToastAndroid.show('hey', ToastAndroid.LONG)
    }

    let pic = {
      uri: 'http://www.gourmetgarden.com/sites/gourmetgarden.sites.go1.com.au/files/atp_gen_gourm_0210_115_parsley.jpg'
    };
    return (

      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Parsley App!
        </Text>
        <Image source={pic} style={{width: 300, height: 300}}/>
        <Text
            style={styles.stat}>
          {`Started: ${this.state.started}`}
        </Text>
        <Text
            style={styles.stat}>
          {`Recognized: ${this.state.recognized}`}
        </Text>
        <Text
            style={styles.stat}>
          {`Pitch: ${this.state.pitch}`}
        </Text>
        <Text
            style={styles.stat}>
          {`Error: ${this.state.error}`}
        </Text>
        <Text
            style={styles.stat}>
          Results
        </Text>
        {this.state.results.map((result, index) => {
          return (
              <Text
                  key={`result-${index}`}
                  style={styles.stat}>
                {result}
              </Text>
          )
        })}
        <Text
            style={styles.stat}>
          Partial Results
        </Text>
        {this.state.partialResults.map((result, index) => {
          return (
              <Text
                  key={`partial-result-${index}`}
                  style={styles.stat}>
                {result}
              </Text>
          )
        })}
        <Text
            style={styles.stat}>
          {`End: ${this.state.end}`}
        </Text>
        <TouchableHighlight onPress={this._startRecognizing.bind(this)}>
          <Text
              style={styles.button}

          >PRess ME</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing.bind(this)}>
          <Text
              style={styles.action}>
            Stop Recognizing
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing.bind(this)}>
          <Text
              style={styles.action}>
            Cancel
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer.bind(this)}>
          <Text
              style={styles.action}>
            Destroy
          </Text>
        </TouchableHighlight>
        <View>
          <Button
              onPress={onPress}
              title="Learn More"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
          />
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
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

AppRegistry.registerComponent('parsely', () => parsely);
