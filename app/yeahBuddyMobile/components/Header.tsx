import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';

import Connexion from '../TemporaryPages/Connexion'
import Inscription from '../TemporaryPages/Inscription'
import Feed from '../TemporaryPages/Feed'

import 'react-native-gesture-handler';

const Menu = createDrawerNavigator()

export default function Header() {
  return (
    <NavigationContainer>
        <Menu.Navigator>
            <Menu.Screen name='Connexion' component={Connexion} />
            <Menu.Screen name='Inscription' component={Inscription} />
            <Menu.Screen name='Feed' component={Feed} />
        </Menu.Navigator>
    </NavigationContainer>
  );
}
