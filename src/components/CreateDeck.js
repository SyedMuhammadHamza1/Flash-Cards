import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/styles";
import { addDeckAS } from "../utils/dataHandler";
import { connect } from "react-redux";
import { addDeck } from "../actions";

class CreateDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: "",
    };
  }
  handleInput = (e) => {
    this.setState({
      [e._dispatchInstances.pendingProps.name]: e.nativeEvent.text,
    });
  };

  handleSubmit = () => {
    const { navigation, addDeck } = this.props;
    const { deckName } = this.state;
    let deckData = {
      title: deckName,
      id: Math.random().toString(36).substring(7),
    };
    addDeck(deckData);
    addDeckAS(deckData);
    this.setState({
      deckName: "",
    });
    navigation.navigate("openDeck", deckData);
  };
  render() {
    const { deckName } = this.state;
    const disabled = deckName === "";
    return (
      <View style={Styles.container}>
        <SafeAreaView>
          <KeyboardAvoidingView keyboardShouldPersistTaps="handled">
            <Text style={[Styles.heading, { marginBottom: 40 }]}>
              What is the title of your new deck?
            </Text>

            <TextInput
              value={deckName}
              name="deckName"
              style={Styles.input}
              placeholder="Enter Dack Name"
              onChange={this.handleInput}
            />

            <TouchableOpacity
              onPress={this.handleSubmit}
              style={[
                Styles.button,
                {
                  backgroundColor: disabled ? colors.disabled : colors.green,
                  marginTop: 40,
                },
              ]}
              disabled={disabled}
              value={deckName}
            >
              <Text style={Styles.text}>Create Deck</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#dedede",
    margin: 5,
    borderRadius: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "#444",
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    width: 250,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },
  text: {
    color: "white",
  },

  buttonView: {
    flexDirection: "row",
    marginTop: 40,
  },
});
export default connect(null, { addDeck })(CreateDeck);
