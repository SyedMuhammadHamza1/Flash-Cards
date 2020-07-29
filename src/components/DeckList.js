import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { handleInitialData } from "../actions";
import { connect } from "react-redux";

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { navigation } = this.props;
    const { loading } = this.state;

    const fetchData = async () => {
      this.setState({
        loading: true,
      });
      this.props.handleInitialData();
      this.setState({
        loading: false,
      });
    };

    function RenderItem({ item }) {
      const { title, questions } = item;

      return (
        <TouchableOpacity
          style={[Styles.listItem, { backgroundColor: item.color }]}
          onPress={() =>
            navigation.navigate("openDeck", {
              title: item.title,
              id: item.id,
              color: item.color,
            })
          }
        >
          <Text style={Styles.heading}>{title}</Text>
          <Text style={[Styles.mutedText, { marginTop: 5 }]}>
            {questions.length ? `${questions.length} cards` : "No cards found"}
          </Text>
        </TouchableOpacity>
      );
    }
    console.log("Props comimg", this.props);
    return (
      <View style={Styles.container}>
        <StatusBar barStyle="dark-content" />

        <SafeAreaView>
          <View>
            <Text style={Styles.mainHeading}>ALL DECK LIST</Text>
          </View>
          <FlatList
            data={this.props.decks}
            renderItem={({ item }) => <RenderItem item={item} />}
            keyExtractor={(item) => item.id}
            onRefresh={fetchData}
            refreshing={loading}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mainHeading: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 25,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },
  mutedText: {
    color: "#777",
  },
  listItem: {
    flex: 1,
    width: 350,
    alignItems: "center",
    marginTop: 6,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dedede",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

const mapStateToProps = (state) => {
  let colors = [
    "#FFD700",
    "#FA8072",
    "#3CB371",
    "#91b200",
    "#dff902",
    "#ffff00",
    "#8cc939",
    "#feb117",
  ];
  let newDecks = Object.values(state).map((item, index) => {
    return {
      id: item.id,
      title: item.title,
      questions: item.questions,
      color: colors[index],
    };
  });
  return {
    decks: newDecks,
  };
};
export default connect(mapStateToProps, { handleInitialData })(DeckList);
