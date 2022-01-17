import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button,Dimensions, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated,{ useSharedValue,useAnimatedStyle, useAnimatedScrollHandler, interpolate, Extrapolate} from 'react-native-reanimated';

const { height, width } = Dimensions.get("screen");


const PizzaContainerForAndroid = ({index, imagePath, scaleOffset}) =>{

   

   const inputRange = [(index - 1)*width,index*width,(index + 1)*width]



   const animatedStyleForScaling = useAnimatedStyle(()=> {
   const scale =  interpolate(scaleOffset.value,inputRange,[0.3,0.9,0.3],Extrapolate.CLAMP)
   const translateX = interpolate(scaleOffset.value,inputRange,[-width/2,0,width/2],Extrapolate.EXTEND)
    const translateY = interpolate(scaleOffset.value,inputRange,[height*0.22,0,height*0.22],Extrapolate.CLAMP)
   return {
       transform : [{translateX},{translateY},{scale} ]
   }
   })
    console.log(width)
    return (
 
        <Animated.View style={[{backgroundColor : 'transparent', overflow : 'visible',},animatedStyleForScaling]}>
             <Image
          source={imagePath}
          style={{
            width : width*0.8,
            height : height*0.4,
            resizeMode : 'contain',
            overflow : 'visible',
            
          }}
          />
          </Animated.View>
      
    )
}


export default PizzaContainerForAndroid;