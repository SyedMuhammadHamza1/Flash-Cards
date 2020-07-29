import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { colors } from "../styles/styles";
import { connect } from "react-redux";
import {
  setLocalNotification,
  clearLocalNotification,
} from "../utils/notificaationHandler";
import ViewPager from "@react-native-community/viewpager";
import { FontAwesome5 } from "@expo/vector-icons";

const view = {
  QUESTION: "QUESTION",
  ANSWER: "ANSWER",
  RESULT: "RESULT",
};

const answer = {
  CORRECT: "CORRECT",
  INCORRECT: "INCORRECT",
};

function Quiz({ navigation, deck, title }) {
  const [currentView, setCurrentView] = useState(view.QUESTION);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [questionsCount, setQuestionCount] = useState(deck.questions.length);
  const [answered, setAnswered] = useState(
    Array(deck.questions.length).fill(0)
  );
  const [page, setPage] = useState(0);

  const setNotification = () => {
    clearLocalNotification().then(setLocalNotification);
  };

  useEffect(() => {
    if (questionsCount === correct + incorrect) {
      setCurrentView(view.RESULT);
      setNotification();
    } else if (correct + incorrect != 0) {
      bodyRef.setPage(page + 1);
      setCurrentView(view.QUESTION);
    }
  }, [correct, incorrect]);

  const handleAnswer = (submission, page) => {
    setPage(page);
    if (submission === answer.CORRECT) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
    setAnswered(answered.map((val, i) => (page === i ? 1 : val)));

    if (questionsCount === correct + incorrect) {
      currentView(view.RESULT);
    } else {
      bodyRef.setPage(page + 1);
      setCurrentView(view.QUESTION);
    }
  };

  const handleQuit = () => {
    handleReset();
    navigation.navigate("openDeck");
  };

  const handleReset = () => {
    setCurrentView(view.QUESTION);
    setCorrect(0);
    setIncorrect(0);
    setAnswered(Array(questionsCount).fill(0));
  };

  const { questions } = deck;

  if (!questions.length) {
    return (
      <View style={Styles.container}>
        <Text style={{ textAlign: "center" }}>
          No Cards Found in this DECK.
        </Text>
        <Text style={{ textAlign: "center" }}>
          Add Cards to start the QUIZ.
        </Text>
      </View>
    );
  }
  const percent = ((correct / questionsCount) * 100).toFixed(0);
  const resultColor = percent >= 50 ? colors.green : colors.red;
  const isPassed = percent >= 50 ? true : false;

  let bodyRef = useRef();

  return (
    <View style={Styles.container}>
      <SafeAreaView>
        {currentView === view.RESULT ? (
          <View>
            <View style={{ alignItems: "center" }}>
              <FontAwesome5
                name={isPassed ? "smile" : "meh"}
                size={50}
                color={resultColor}
              />
              <Text style={[Styles.heading, { marginBottom: 10 }]}>
                Quiz Complete
              </Text>
              <Text style={[Styles.mutedText, { marginBottom: 10 }]}>
                {correct} / {questionsCount} correct answers
              </Text>
              <Text>{percent}%</Text>
            </View>

            <View style={Styles.buttonView}>
              <TouchableOpacity
                style={[Styles.quizButton, { backgroundColor: colors.black }]}
                onPress={handleReset}
              >
                <Text style={[Styles.text, { color: "white" }]}>
                  Restart Quiz
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[Styles.quizButton, { backgroundColor: colors.red }]}
                onPress={handleQuit}
              >
                <Text style={[Styles.text, { color: "white" }]}>
                  Back to Deck
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <KeyboardAvoidingView behavior="padding">
            <ViewPager
              style={Styles.viewPager}
              initialPage={0}
              ref={(viewPage) => {
                bodyRef = viewPage;
              }}
            >
              {questions.map((question, index) => (
                <View style={Styles.page} key={index}>
                  <Text>
                    {index + 1} / {questions.length}
                  </Text>
                  <View style={[Styles.questionCard, Styles.cardBox]}>
                    <Text style={Styles.heading}>
                      {currentView === view.QUESTION ? "Question" : "Answer"}
                    </Text>
                    <View>
                      <Text style={Styles.question}>
                        {currentView === view.QUESTION
                          ? question.question
                          : question.answer}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    {currentView === view.QUESTION ? (
                      <TouchableOpacity
                        onPress={() => setCurrentView(view.ANSWER)}
                      >
                        <Text style={[Styles.text, { color: "red" }]}>
                          Show Answer
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => setCurrentView(view.QUESTION)}
                      >
                        <Text style={[Styles.text, { color: "red" }]}>
                          Hide Answer
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={Styles.buttonView}>
                    <TouchableOpacity
                      onPress={() => handleAnswer(answer.CORRECT, index)}
                      disabled={answered[index] === 1}
                      style={[
                        Styles.quizButton,
                        { backgroundColor: colors.green },
                      ]}
                    >
                      <Text style={Styles.text}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleAnswer(answer.INCORRECT, index)}
                      disabled={answered[index] === 1}
                      style={[
                        Styles.quizButton,
                        { backgroundColor: colors.red },
                      ]}
                    >
                      <Text style={Styles.text}>Incorrect</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ViewPager>
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    </View>
  );
}

const Styles = StyleSheet.create({
  cardBox: {
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
  quizButton: {
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    width: 150,
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
  viewPager: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: "50%",
  },
  page: {
    alignItems: "center",
    justifyContent: "center",
  },

  questionCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: 300,
    alignItems: "center",
    backgroundColor: "#DCDCDC",
    height: 200,
    padding: 10,
  },
  question: {
    fontSize: 18,
    marginTop: 40,
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 40,
  },
});
const mapStateToProps = (state, { route }) => {
  const { id } = route.params;
  const deck = state[id];
  return {
    deck,
  };
};

export default connect(mapStateToProps)(Quiz);
