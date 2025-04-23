import { registerRootComponent } from 'expo';
import { enableScreens } from 'react-native-screens';
import { LogBox, YellowBox } from 'react-native';

// Ignorar avisos específicos
LogBox.ignoreLogs([
  'Unsupported top level event type "topInsetsChange" dispatched',
  'Non-serializable values were found in the navigation state',
  'Sending `topInsetsChange` with',
  'Native module cannot be null',
  'Setting a timer for a long period of time',
]);

// Inicializar o react-native-screens
enableScreens(true);

import App from './App';

// registerRootComponent chama AppRegistry.registerComponent('main', () => App);
// Também garante que a interface do usuário seja carregada quando o app é executado em um dispositivo
registerRootComponent(App);
