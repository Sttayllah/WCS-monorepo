import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Login() {
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
        <TextInput style={styles.input} />
        <Text>Password</Text>
        <TextInput
          textContentType="newPassword"
          secureTextEntry={true}
          style={styles.input}
        />
        <Text>Confirm password</Text>
        <TextInput
          textContentType="newPassword"
          secureTextEntry={true}
          style={styles.input}
        />
        <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
          <Pressable style={styles.button}>
            <Text style={{ textAlign: "center" }}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

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
