import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Dimensions, FlatList, Image } from 'react-native';
import Animated,{ useSharedValue,useAnimatedStyle, useAnimatedScrollHandler, interpolate, runOnUI, runOnJS} from 'react-native-reanimated';

 
import {assets} from './data'
import PizzaContainer from './PizzaContainer';

const { height, width } = Dimensions.get("screen");

export default function App() {

  const scaleOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll : (e,context) => {
     
     scaleOffset.value = e.contentOffset.x
     console.log(scaleOffset.value)
    },
   
  },[])

 
  return (
      <View style={{ 
       backgroundColor : 'blue',
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={{
          position : 'absolute'
        }}>
        <Image
            source={assets.plate}
            style={{
              width : width,
              height : height*0.4,
              resizeMode : 'contain'
            }}
            />
        </View>


        <View style={{
          width,
          height : height*0.5,
          position : 'relative',
          transform : [{
            translateY : (height*0.05)
          }]
        }}>

      <Animated.FlatList
        data={assets.pizza}
        horizontal ={true}
        snapToInterval={width}
        decelerationRate={'fast'}
        scrollEventThrottle={16}
        bounce={false}
        onScroll={scrollHandler}
        renderItem={(item) =>{
        
          return(
            <PizzaContainer index={item.index}  imagePath={item.item} scaleOffset={scaleOffset}/>
          )
        }}
        />
        </View>
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
