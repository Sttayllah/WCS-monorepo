import { NavigationContainer } from "@react-navigation/native";

import "react-native-gesture-handler";
import { CameraScreen } from "../screens/CameraScreen";
import { Ionicons } from "@expo/vector-icons";
import { ImageScreen } from "../screens/ImageScreen";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Feed from "../screens/Feed";

const Menu = createDrawerNavigator();

export default function Header() {
  return (
    <NavigationContainer>
      <Menu.Navigator>
        <Menu.Screen
          options={{
            title: "Login",
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? "log-in" : "log-in-outline"}
                size={size}
                color={focused ? "#cc987a" : "black"}
              />
            ),
          }}
          name="Login"
          component={Login}
        />
        <Menu.Screen
          options={{
            title: "Register",
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={
                  focused
                    ? "ellipsis-horizontal"
                    : "ellipsis-horizontal-outline"
                }
                size={size}
                color={focused ? "#cc987a" : "#grey"}
              />
            ),
          }}
          name="Feed"
          component={Register}
        />
        <Menu.Screen
          options={{
            title: "Feed",
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? "share-social" : "share-social-outline"}
                size={size}
                color={focused ? "#cc987a" : "#grey"}
              />
            ),
          }}
          name="Register"
          component={Feed}
        />
        <Menu.Screen
          options={{
            title: "Camera",
            unmountOnBlur: true,
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? "camera" : "camera-outline"}
                size={size}
                color={focused ? "#cc987a" : "#grey"}
              />
            ),
          }}
          name="camera"
          component={CameraScreen}
        />

        <Menu.Screen
          name="Image"
          options={{
            title: "Image",
            unmountOnBlur: true,
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? "image" : "image-outline"}
                size={size}
                color={focused ? "#cc987a" : "#grey"}
              />
            ),
          }}
          component={ImageScreen}
        />
      </Menu.Navigator>
    </NavigationContainer>
  );
}
