import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { colors } from "../styles/styles";
import { connect } from "react-redux";
import { addCardDeck } from "../actions";
import { addCardAS } from "../utils/dataHandler";

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
    };
  }
  handleInput = (e) => {
    this.setState({
      [e._dispatchInstances.pendingProps.name]: e.nativeEvent.text,
    });
  };
  handleSubmit = () => {
    const { deck, addCardDeck, navigation } = this.props;
    const { question, answer } = this.state;
    addCardDeck(deck, {
      question,
      answer,
    });
    addCardAS(deck, {
      question,
      answer,
    });
    navigation.goBack();
  };
  render() {
    const { question, answer } = this.state;
    const disabled = question === "" || answer === "" ? true : false;
    return (
      <View style={Styles.container}>
        <SafeAreaView>
          <KeyboardAvoidingView behavior="padding">
            <View style={{ height: "100%", justifyContent: "center" }}>
              <Text style={[Styles.heading, { marginBottom: 40 }]}>
                Fill fields to add new Card in the Deck
              </Text>
              <TextInput
                style={Styles.input}
                value={this.state.question}
                placeholder="Enter Question"
                name="question"
                onChange={this.handleInput}
              />
              <TextInput
                style={Styles.input}
                value={this.state.answer}
                placeholder="Enter Answer"
                name="answer"
                onChange={this.handleInput}
              />

              <TouchableOpacity
                onPress={this.handleSubmit}
                style={[
                  Styles.button,
                  {
                    backgroundColor: disabled ? colors.disabled : colors.blue,
                    marginTop: 40,
                  },
                ]}
              >
                <Text style={Styles.text}>Submit</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  button: {
    color: "#444",
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    width: 250,
  },
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

const mapStateToProps = (state, { route }) => {
  const { deck } = route.params;
  return {
    deck,
  };
};

export default connect(mapStateToProps, { addCardDeck })(AddCard);
