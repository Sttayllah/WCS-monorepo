import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Header from "./components/Header";

const Tab = createBottomTabNavigator();

export default function App() {
  return <Header />;
}
