import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import HomePage from "./Screens/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PizzaIngredients from "./Screens/PizzaIngredients";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Pizza Ingredients" component={PizzaIngredients} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
