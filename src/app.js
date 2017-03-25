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
import { StackNavigator } from 'react-navigation';
// import VoiceRecognise from 'VoiceRecognise';
import MainScreen from './screens/MainScreen';
import StatScreen from './screens/StatScreen';

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
