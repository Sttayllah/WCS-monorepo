import { FlatList, StyleSheet, Text, View, Image } from "react-native";

const data = [
  {
    img: require("../assets/beach.jpeg"),
    title: "La plage c'est bien",
    date: "01/09/2022",
    summary:
      "Les doigts de pied en éventail, cocktail à la main, ça fait rêver non?",
    author: "Gérard le connard",
    id: "1",
  },
  {
    img: require("../assets/forest.jpeg"),
    title: "La forêt aussi",
    date: "20/09/2022",
    summary:
      "Voir des lutins après la consommation de champignon, on vous explique tout",
    author: "Dimitri l'abruti",
    id: "2",
  },
  {
    img: require("../assets/mountains.jpeg"),
    title: "C'est une montagne",
    date: "21/10/2022",
    summary:
      "La description est à la hauteur de ce titre... ou de cette montagne",
    author: "Joe l'clodo",
    id: "3",
  },
  {
    img: require("../assets/thailande.jpeg"),
    title: "Une balade en bateau ça vous tente?",
    date: "02/01/2023",
    summary:
      "Le 2 janvier, on a plus envie de rester au lit que d'aller bosser !",
    author: "Émile le débile",
    id: "4",
  },
];

export default function Feed() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.article}>
            <Image source={item.img} style={styles.image} />
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={styles.summary}>{item.summary}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EBE3",
    padding: 20,
  },
  article: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 40,
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "white",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
  },
  date: {
    textDecorationLine: "underline",
  },
  summary: {
    fontStyle: "italic",
  },
  author: {
    fontWeight: "bold",
    textAlign: "right",
    textDecorationLine: "underline",
  },
});
