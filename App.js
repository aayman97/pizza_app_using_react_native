import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Dimensions, FlatList, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated,{ useSharedValue,useAnimatedStyle, useAnimatedScrollHandler, interpolate, runOnUI, runOnJS} from 'react-native-reanimated';
import BackgroundPlate from './BackgroundPlate';

 
import {assets} from './data'
import PizzaContainer from './PizzaContainer';
import HomePage from './Screens/HomePage';
import PizzaIngredients from './Screens/PizzaIngredients';

const { height, width } = Dimensions.get("screen");

export default function App() {


 
  return (
      <View style ={{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
          <HomePage/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
