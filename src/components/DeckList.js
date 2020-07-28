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
import { styles } from "../styles/styles";

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { navigation } = this.props;

    function RenderItem({ item }) {
      const { title, questions } = item;

      return (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() =>
            navigation.navigate("openDeck", {
              title: item.title,
              id: item.id,
            })
          }
        >
          <Text style={styles.heading}>{title}</Text>
          <Text style={[styles.mutedText, { marginTop: 5 }]}>
            {questions.length ? `${questions.length} cards` : "No cards found"}
          </Text>
        </TouchableOpacity>
      );
    }
    console.log("Props comimg", this.props);
    const data = this.props.decks;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <FlatList
            data={Object.values(data)}
            renderItem={({ item }) => <RenderItem item={item} />}
            keyExtractor={(item) => item.id}
            //   onRefresh={fetchData}
            //   refreshing={loading}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  decks: state,
});
export default connect(mapStateToProps, { handleInitialData })(DeckList);
