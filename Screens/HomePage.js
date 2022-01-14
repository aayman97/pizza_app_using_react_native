import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Dimensions, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated,{ useSharedValue,useAnimatedStyle, useAnimatedScrollHandler, interpolate, runOnUI, runOnJS, withTiming} from 'react-native-reanimated';
import BackgroundPlate from '../BackgroundPlate';

 
import {assets} from '../data'
import PizzaContainer from '../PizzaContainer';
import PizzaIngredients from './PizzaIngredients';

const { height, width } = Dimensions.get("screen");


const HomePage = () => {
    
    
  const scaleOffset = useSharedValue(0);
  const translatePages = useSharedValue(0)
  const translateXSharedValue = useSharedValue(0);
  const translateYSharedValue = useSharedValue(0);


  const animatedStyleForPages = useAnimatedStyle(() => {
      return {
          transform : [{
              translateX : translatePages.value
          }]
      }
  })
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXSharedValue.value }],
    };
  });


  const scrollHandler = useAnimatedScrollHandler({
    onScroll : (e,context) => {
     
     scaleOffset.value = e.contentOffset.x
    
    },
   
  },[])
    return (
        <Animated.View style={[{ 
             flex : 1,
             alignItems: 'center',
             justifyContent: 'center',       
           }]}>
            

      
    
           <BackgroundPlate  Offset={scaleOffset} imagePath={assets.plate}/>
     
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
             
            //  style={{
            //      transform : [{
            //          translateY : -height*0.05
            //      }]
            //  }}
             onScroll={scrollHandler}
             renderItem={(item) =>{
             
               return(
                 <TouchableOpacity onPress={() => {  }}>
                     
                          <PizzaContainer index={item.index}  imagePath={item.item} scaleOffset={scaleOffset}/>
                    
                   
                 </TouchableOpacity>
                
               )
             }}
             />
             </View>
            
         
           
        </Animated.View>
        )
}

export default HomePage;