import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  Image,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootMenuParamList } from "../components/Header";

export const GET_TOKEN = gql`
  query Query($password: String!, $email: String!) {
    getToken(password: $password, email: $email)
  }
`;

const CREATE_USER = gql`
  mutation Mutation(
    $password: String!
    $email: String!
    $pseudo: String!
    $avatar: String!
    $description: String!
  ) {
    createUser(
      pseudo: $pseudo
      password: $password
      email: $email
      avatar: $avatar
      description: $description
    ) {
      email
      pseudo
      description
      avatar
    }
  }
`;
type registerScreenprop = DrawerNavigationProp<RootMenuParamList, "Feed">;
const storeData = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
  console.log(value);
};

export const Register = () => {
  const { setLocalUser } = useUser();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation<registerScreenprop>(); //WIP

  const [loadToken] = useLazyQuery(GET_TOKEN, {
    variables: {
      email: email,
      password: password,
    },

    onCompleted(data) {
      const res = JSON.parse(data.getToken);
      // console.log(res);
      setLocalUser({ ...res.user });
      storeData("token", res.token);
      // console.log("data", data);
      navigation.navigate("Feed"); //WIP
    },
    onError(error) {
      console.log(error);
    },
  });

  const [createUser] = useMutation(CREATE_USER, {
    variables: {
      email: email,
      password: passwordConfirm,
      pseudo: pseudo,
      avatar: "avatar",
      description: "Description",
    },
    onCompleted: () => {
      loadToken();
    },
    onError(error) {
      console.log("EEEERRRRRRRRRRROOOOOOORRRRRR", error);
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
        <Text>Pseudo</Text>
        <TextInput
          textContentType="nickname"
          style={styles.input}
          value={pseudo}
          onChangeText={(text) => setPseudo(text)}
        />
        <Text>Email</Text>
        <TextInput
          textContentType="emailAddress"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>Password</Text>
        <TextInput
          textContentType="newPassword"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text>Confirm password</Text>
        <TextInput
          textContentType="newPassword"
          secureTextEntry={true}
          style={styles.input}
          value={passwordConfirm}
          onChangeText={(text) => {
            setPasswordConfirm(text);
          }}
        />
        <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
          <Pressable style={styles.button}>
            <Text
              style={{ textAlign: "center" }}
              onPress={() => {
                password !== passwordConfirm
                  ? alert("les mots de passe de correspondent pas")
                  : createUser();
              }}
            >
              Register
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
    height: 500,
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
