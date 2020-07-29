import React from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/styles";
import { connect } from "react-redux";
import { deleteDeck } from "../actions";
import { deleteDeckAS } from "../utils/dataHandler";

function OpenDeck({ route, navigation, deleteDeck, deck }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: deck.title,
    });
  }, [navigation]);

  function handleOnPress() {
    Alert.alert(
      `Are you sure you want to delete ${deck.title}`,
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDelete(),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  }

  async function handleDelete() {
    deleteDeck(deck.id);
    await deleteDeckAS(deck.id);
    navigation.pop();
  }

  const { title, questions, id } = deck;
  const { color } = route.params;

  return (
    <View style={Styles.container}>
      <SafeAreaView>
        <View style={{ height: "90%", justifyContent: "center" }}>
          <View style={[Styles.cardBox, { backgroundColor: color }]}>
            <Text style={Styles.heading}>{title}</Text>
            <Text>{questions.length} Cards</Text>
          </View>

          <TouchableOpacity
            style={[
              Styles.button,
              { backgroundColor: colors.blue, marginBottom: 20 },
            ]}
            onPress={() => navigation.navigate("AddCard", { deck: deck })}
          >
            <Text style={Styles.text}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[Styles.button, { backgroundColor: colors.green }]}
            onPress={() => navigation.navigate("quiz", { id: deck.id })}
          >
            <Text style={Styles.text}>Start Quiz</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.container}>
          <TouchableOpacity style={Styles.deleteButton}>
            <Text
              style={[Styles.text, { color: "red", marginBottom: 20 }]}
              onPress={handleOnPress}
            >
              Delete Deck
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = (state, { route }) => {
  const { id } = route.params;
  const deck = state[id] ? state[id] : { id: "", questions: 0 };
  return { deck };
};

export default connect(mapStateToProps, {
  deleteDeck,
})(OpenDeck);

const Styles = StyleSheet.create({
  cardBox: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
    height: 90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  button: {
    color: "#444",
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    width: 250,
  },
  deleteButton: {
    position: "absolute",
    bottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },
  text: {
    color: "white",
  },
});
