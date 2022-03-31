/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {LogBox, Text} from 'react-native';
if (Platform.OS === 'android') {
  // only android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/bn'); // load the required locale details
}
LogBox.ignoreLogs(['NativeBase:']);
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
AppRegistry.registerComponent(appName, () => App);
