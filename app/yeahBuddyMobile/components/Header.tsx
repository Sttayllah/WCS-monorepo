import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { CameraScreen } from '../screens/CameraScreen';
import { Ionicons } from '@expo/vector-icons';
import { ImageScreen } from '../screens/ImageScreen';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { Profile } from '../screens/Profile';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Feed from '../screens/Feed';

export type RootMenuParamList = {
  Feed: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  Camera: undefined;
  Image: undefined;
  Logout: undefined;
}; //WIP
const Menu = createDrawerNavigator<RootMenuParamList>();

export default function Header() {
  return (
    <NavigationContainer>
      <Menu.Navigator>
        <Menu.Screen
          options={{
            title: 'Login',
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? 'log-in' : 'log-in-outline'}
                size={size}
                color={focused ? '#cc987a' : 'black'}
              />
            ),
          }}
          name='Login'
          component={Login}
        />

        <Menu.Screen
          options={{
            title: 'Register',
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={
                  focused
                    ? 'ellipsis-horizontal'
                    : 'ellipsis-horizontal-outline'
                }
                size={size}
                color={focused ? '#cc987a' : 'black'}
              />
            ),
          }}
          name='Register'
          component={Register}
        />

        <Menu.Screen
          options={{
            title: 'Feed',
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? 'share-social' : 'share-social-outline'}
                size={size}
                color={focused ? '#cc987a' : 'black'}
              />
            ),
          }}
          name='Feed'
          component={Feed}
        />

        <Menu.Screen
          options={{
            title: 'Camera',
            unmountOnBlur: true,
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? 'camera' : 'camera-outline'}
                size={size}
                color={focused ? '#cc987a' : 'black'}
              />
            ),
          }}
          name='Camera'
          component={CameraScreen}
        />

        <Menu.Screen
          name='Image'
          options={{
            title: 'Image',
            unmountOnBlur: true,
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? 'image' : 'image-outline'}
                size={size}
                color={focused ? '#cc987a' : 'black'}
              />
            ),
          }}
          component={ImageScreen}
        />

        <Menu.Screen
          options={{
            title: 'Profile',
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={focused ? '#cc987a' : 'black'}
              />
            ),
          }}
          name='Profile'
          component={Profile}
        />
      </Menu.Navigator>
    </NavigationContainer>
  );
}
