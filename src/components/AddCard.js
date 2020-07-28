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
      <View style={styles.container}>
        <SafeAreaView>
          <KeyboardAvoidingView behavior="padding">
            <View style={{ height: "100%", justifyContent: "center" }}>
              <Text style={[styles.heading, { marginBottom: 40 }]}>
                Please enter following to add new card
              </Text>
              <TextInput
                style={styles.input}
                value={this.state.question}
                placeholder="Enter Question"
                name="question"
                onChange={this.handleInput}
              />
              <TextInput
                style={styles.input}
                value={this.state.answer}
                placeholder="Enter Answer"
                name="answer"
                onChange={this.handleInput}
              />

              <TouchableOpacity
                onPress={this.handleSubmit}
                style={[
                  styles.button,
                  {
                    backgroundColor: disabled ? colors.disabled : colors.blue,
                    marginTop: 40,
                  },
                ]}
              >
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (state, { route }) => {
  const { deck } = route.params;
  return {
    deck,
  };
};

export default connect(mapStateToProps, { addCardDeck })(AddCard);
