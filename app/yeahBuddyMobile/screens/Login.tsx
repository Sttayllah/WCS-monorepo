import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";

export const GET_TOKEN = gql`
  query Query($password: String!, $email: String!) {
    getToken(password: $password, email: $email)
  }
`;

export const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();//WIP
  const { setLocalUser } = useUser();
  const storeData = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  };
  const [loadToken] = useLazyQuery(GET_TOKEN, {
    variables: {
      email: mail,
      password: password,
    },
    onCompleted(data) {
      // console.log(data);
      const res = JSON.parse(data.getToken);
      // console.log(res);
      setLocalUser({ ...res.user });
      storeData("token", res.token);
      console.log("data", data);

      // navigate('/userzzz');//WIP
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <View style={styles.globalContainer}>
      <View style={styles.formContainer}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            style={styles.logo}
            source={require("../assets/logo-removebg-preview.png")}
          />
        </View>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your mail"
          value={mail}
          onChangeText={(text) => setMail(text)}
        />
        <Text>Password</Text>
        <TextInput
          textContentType="password"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
          <Pressable style={styles.button}>
            <Text style={{ textAlign: "center" }} onPress={() => loadToken()}>
              Connexion
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: "#F0EBE3",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#FFF",
    height: 400,
    width: 300,
    borderRadius: 5,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "gray",
    shadowOpacity: 0.5,
  },
  logo: {
    height: 78,
    width: 126,
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#cc987a",
    padding: 10,
    width: 100,
    margin: "auto",
    borderRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "gray",
    shadowOpacity: 0.8,
  },
});
