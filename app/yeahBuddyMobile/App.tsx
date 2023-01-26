import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import Feed from "./screens/Feed";
import Register from "./screens/Register";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === "Login") {
              iconName = focused ? "log-in" : "log-in-outline";
            } else if (route.name === "Feed") {
              iconName = focused ? "share-social" : "share-social-outline";
            } else if (route.name === "Register") {
              iconName = focused
                ? "ellipsis-horizontal"
                : "ellipsis-horizontal-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#cc987a",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Register" component={Register} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
