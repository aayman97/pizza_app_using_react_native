import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button,Dimensions, FlatList, Image,Platform,TouchableOpacity } from 'react-native';
import Animated,{ useSharedValue,useAnimatedStyle, useAnimatedScrollHandler, interpolate, Extrapolate} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get("screen");


const PizzaContainer = ({index, imagePath, scaleOffset}) =>{

  const navigation = useNavigation();

   const inputRange = [(index - 1)*width,index*width,(index + 1)*width]

   

   const animatedStyleForScaling = useAnimatedStyle(()=> {
   const scale =  interpolate(scaleOffset.value,inputRange,[0.3,0.8,0.3],Extrapolate.CLAMP)
   const translateX = interpolate(scaleOffset.value,inputRange,[-width/2,0,width/2],Extrapolate.EXTEND)
    const translateY = interpolate(scaleOffset.value,inputRange,[height*0.22,0,height*0.22],Extrapolate.CLAMP)
    
    if(Platform.OS == "ios"){
      return {
        transform : [{translateX},{translateY},{scale} ]
    }
    }
    else{
      return{
        transform : [{scale} ]
      }
    }
  
  
   })

   console.log(imagePath)
    return (
 
        <Animated.View style={[{backgroundColor : 'transparent', overflow : 'visible', },animatedStyleForScaling]}>
          
          <TouchableOpacity onPress={() => navigation.navigate("Pizza Ingredients",{imagePath})}>
             <Image
          source={imagePath}
          style={{
            width : width,
            height : height*0.4,
            resizeMode : 'contain',
            overflow : 'visible',
            
          }}
          />
          </TouchableOpacity>
            
          </Animated.View>
      
    )
}


export default PizzaContainer;
