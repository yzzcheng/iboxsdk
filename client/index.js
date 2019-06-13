import {AppRegistry} from 'react-native';
import APP from './src/sdk';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => APP);
