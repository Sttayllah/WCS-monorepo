import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Header from "./components/Header";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { UserProvider } from "./contexts/UserContext";
import * as SecureStore from "expo-secure-store";

const Tab = createBottomTabNavigator();

const getData = async (key: string) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
};

const httpLink = createHttpLink({
  uri: "http://192.168.1.20:5000/", //personnal IP adress to make Apollo client working
});
const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getData("token");
  console.log("token from localstorage ", token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export default function App() {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Header />
      </UserProvider>
    </ApolloProvider>
  );
}
