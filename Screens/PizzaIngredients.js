import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Dimensions, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated,{ useSharedValue,useAnimatedStyle, useAnimatedScrollHandler, interpolate, runOnUI, runOnJS} from 'react-native-reanimated';
import BackgroundPlate from '../BackgroundPlate';
import { assets } from '../data';


const { height, width } = Dimensions.get("screen");


const PizzaIngredients = () => {


    return (
        <View style={{ 
            backgroundColor : 'blue',
             flex : 1,
             alignItems: 'center',
             justifyContent: 'center',
             height : height*0.8,
             width,
           }}>
            
           <View>
            <View style={{
                flex : 1,
                justifyContent : 'center'
            }}>
                  <Image
              source= {assets.plate}
              style={{
                width : width,
                height : height*0.4,
                resizeMode : 'contain'
              }}
              />
            </View>
         

              <View style={{
                  flex : 1,
                  backgroundColor : 'yellow'
              }}>

              </View>
           </View>


           </View>
    )
}

export default PizzaIngredients;