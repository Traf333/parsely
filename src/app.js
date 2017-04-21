import React, {Component} from 'react';
import {
  Alert,
  AsyncStorage,
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
import { StackNavigator } from 'react-navigation';
import Storage from 'react-native-storage';


import MainScreen from './screens/MainScreen';
import StatScreen from './screens/StatScreen';


let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null
  // sync: { return }
});

global.storage = storage;

const App = StackNavigator({
  Main: {screen: MainScreen},
  Stat: {screen: StatScreen}
});

export default App;
//
// export default class App extends Component {
//   render() {
//     return (
//       <Navigator
//         styles={styles.navigator}
//         initialRoute={{
//           title: 'Главная',
//           component: Home
//         }}
//         renderScene={ (route, navigator) => {
//           if (route.title == 'Home') {
//             return <Home title={route.title}/>
//           }
//           if (route.title == 'Stat') {
//             return <Stat title="stat"/>
//           }
//         }
//         }
//       />
//     )
//   }
// }
//
// const Home = ({title}) => (
//   <View style={styles.container}>
//     <Text style={styles.welcome}>Helo #{title}</Text>
//     <VoiceRecognise />
//   </View>
// )
