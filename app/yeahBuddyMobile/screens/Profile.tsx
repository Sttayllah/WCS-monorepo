import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  
  export const Profile = () => {
    return (
      <View style={styles.mainWrapper}>
            <View style={styles.alignCenter}>
                <Image
                style={styles.userPicture}
                source={require("../assets/ronnie_user.jpg")}
                />
                <Text style={styles.userName}>Ronnie Coleman</Text>
                <Text style={styles.userDescription}>“Everybody wants to be a bodybuilder, but nobody wants to lift no heavy-ass weights.”</Text>
            </View>
            <View style={styles.listWrapper}>
                <View style={[styles.items, styles.shadowProp]}>
                    <Text style={styles.itemsText}>Mes articles</Text>
                    <Ionicons style={styles.itemsIcon} name="book-outline"></Ionicons>
                </View>
                <View style={[styles.items, styles.shadowProp]}>
                    <Text style={styles.itemsText}>Modifier profile</Text>
                    <Ionicons style={styles.itemsIcon} name="pencil-outline"></Ionicons>
                </View>
                <View style={[styles.items, styles.shadowProp]}>
                    <Text style={styles.itemsText}>Notifications</Text>
                    <Ionicons style={styles.itemsIcon} name="notifications-outline"></Ionicons>
                </View>
                <View style={[styles.items, styles.shadowProp]}>
                    <Text style={styles.itemsText}>Paramètres</Text>
                    <Ionicons style={styles.itemsIcon} name="settings-outline"></Ionicons>
                </View>
            </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        alignItems: "center",
        padding: 30,
        backgroundColor: "#F0EBE3",
    },

    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },

    alignCenter: {
        alignItems: "center",
    },

    userName: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
        marginVertical: 10
    },

    userDescription: {
        textAlign: "center",
        fontStyle: "italic",
        fontSize: 20
    },

    userPicture: {
        borderRadius: 100,
        height: 200,
        width: 200,
        resizeMode: 'cover'
    },

    listWrapper: {
        marginTop: 80,
        alignSelf: "stretch",
    },

    items: {
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#cc987a",
        marginVertical: 10,
    },

    itemsText: {
        fontSize: 20,
    },

    itemsIcon: {
        fontSize: 25,
    },

  });
  