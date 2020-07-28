import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { styles, colors } from "../styles/styles";
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
      <View style={styles.container}>
        <SafeAreaView>
          <KeyboardAvoidingView keyboardShouldPersistTaps="handled">
            <Text style={[styles.heading, { marginBottom: 40 }]}>
              What is the title of your new deck?
            </Text>

            <TextInput
              value={deckName}
              name="deckName"
              style={styles.input}
              placeholder="Enter Dack Name"
              onChange={this.handleInput}
            />

            <TouchableOpacity
              onPress={this.handleSubmit}
              style={[
                styles.button,
                {
                  backgroundColor: disabled ? colors.disabled : colors.green,
                  marginTop: 40,
                },
              ]}
              disabled={disabled}
              value={deckName}
            >
              <Text style={styles.text}>Create Deck</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(null, { addDeck })(CreateDeck);
