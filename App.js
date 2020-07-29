import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./src/reducers/index";
import DeckList from "./src/components/DeckList";
import OpenDeck from "./src/components/OpenDeck";
import AddCard from "./src/components/AddCard";
import CreateDeck from "./src/components/CreateDeck";
import Quiz from "./src/components/Quiz";
import { setLocalNotification } from "./src/utils/notificaationHandler";

const store = createStore(reducer, applyMiddleware(thunk));

const DecksStack = createStackNavigator();

function DecksStackScreen() {
  return (
    <DecksStack.Navigator>
      <DecksStack.Screen
        name="deckList"
        component={DeckList}
        options={{
          headerTitle: "Decks",
        }}
      />
      <DecksStack.Screen name="openDeck" component={OpenDeck} />
      <DecksStack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          headerTitle: "Add Card",
        }}
      />
      <DecksStack.Screen
        name="quiz"
        component={Quiz}
        options={{
          headerTitle: "Quiz",
        }}
      />
    </DecksStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    setLocalNotification();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "decks") {
              iconName = focused ? "md-folder" : "md-folder-open";
            } else if (route.name === "addDecks") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="decks" component={DecksStackScreen} />
        <Tab.Screen name="addDecks" component={CreateDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
