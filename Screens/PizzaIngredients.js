import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  runOnUI
} from "react-native-reanimated";
import BackgroundPlate from "../BackgroundPlate";
import { assets } from "../data";
import { PanGestureHandler } from 'react-native-gesture-handler';


const { height, width } = Dimensions.get("screen");

const IngredientsButtons = ({ path ,index , setState, name , ingredientState,acceptedState}) => {


  const [layout,setLayoutProps] = React.useState()
  const [ accepted , setAccepted ] = React.useState(false)

  const x = useSharedValue(0);
  const y = useSharedValue(0);


  
  const animatedStyleForIngredientButtons = useAnimatedStyle(() => {

   
    return {
      zIndex : 10,
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY : y.value
        },
        
      ],
    };
  });
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY+ event.translationY;
    
    },
    onEnd: (_) => {
      if(layout){
        if( x.value > ((((width - height * 0.4)/2))- Math.abs((width * 0.18) - layout.x)) - (layout.width*index) 
          && x.value < (width - ((width - height * 0.4)/2))
          && y.value < -(((height * 0.4) - (height * 0.4)*0.9) + (width  *0.18)) 
          && y.value > -(height * 0.4)
          ){
        runOnJS(setAccepted)(true)
      
      }else{
        runOnJS(setAccepted)(false)
       
      }
      }
      x.value = withSpring(0);
      y.value = withSpring(0);
      runOnJS(setAccepted)(false)
     
      
    },
  });

  React.useEffect(() => {
      
        console.log(index + " = " + accepted)
        if(accepted){
          if(name == 'basil'){
             setState({
            ...ingredientState,
            basil : ingredientState.basil+1
          })
          }
          else if(name == "sausage"){
            setState({
              ...ingredientState,
              sausage : ingredientState.sausage+1
            })
          }else if(name == 'onion'){
            setState({
              ...ingredientState,
              onion : ingredientState.onion+1
            })
          }else if(name == 'broccoli'){
            setState({
              ...ingredientState,
              broccoli : ingredientState.broccoli+1
            })
          }else if(name == 'mushroom'){
            setState({
              ...ingredientState,
              mushroom : ingredientState.mushroom+1
            })
          }

         
        }
  },[accepted])

  return (
    <TouchableOpacity onPress={() => {
      if(name == 'basil'){
       setState({
      ...ingredientState,
      basil : ingredientState.basil+1,
      zIndex : ingredientState.zIndex+1
    })
    }
    else if(name == "sausage"){
      setState({
        ...ingredientState,
        sausage : ingredientState.sausage+1,
        zIndex : ingredientState.zIndex+1
      })
    }else if(name == 'onion'){
      setState({
        ...ingredientState,
        onion : ingredientState.onion+1
      })
    }else if(name == 'broccoli'){
      setState({
        ...ingredientState,
        broccoli : ingredientState.broccoli+1
      })
    }else if(name == 'mushroom'){
      setState({
        ...ingredientState,
        mushroom : ingredientState.mushroom+1
      })
    }
 
    
   }}>
    <PanGestureHandler onGestureEvent={gestureHandler}>
      
      <Animated.View
      style={[{
        width: width * 0.18,
        height: width * 0.18,
        borderRadius: width * 0.2,
        backgroundColor: "#FFFF8F",
        padding: width * 0.05,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: width * 0.03,
        zIndex : 10
      },animatedStyleForIngredientButtons]}

      onLayout={(e) =>{
        const layoutProps = {
          x : e.nativeEvent.layout.x,
          y : e.nativeEvent.layout.y,
          width : e.nativeEvent.layout.width,
          height : e.nativeEvent.layout.height
        }

        setLayoutProps(layoutProps)
      }}
    >
      <Image
        source={path}
        style={[
          {
            width: "100%",
            height: "100%",
            resizeMode: "contain",
            position: "absolute",
          },
        ]}
      />
    </Animated.View>
     

    </PanGestureHandler>
    </TouchableOpacity>
  );
};



const IngredientsImage = ({imagePath, itemsLength,index}) =>{


  const xValue = useSharedValue(0)
  const yValue = useSharedValue(0)

  const scaleOffset = useSharedValue(3)

  const theta = index*(2*360/itemsLength);  

  const radius = (0.95*(height * 0.4))/2

  const min = 0.2
  const max = 0.7
  console.log(index)
  console.log("x = "+ radius * Math.cos(theta))
  console.log("y = "+ radius * Math.sin(theta))

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale : scaleOffset.value},{ translateX: xValue.value },{translateY : yValue.value}],
    };
  });

  React.useEffect(() => {
    xValue.value = withTiming((radius*(Math.random() * (max - min) + min)) * Math.cos(theta) + (height*0.4/12),{
      duration : 1000
    })
    yValue.value = withTiming((radius*(Math.random() * (max - min) + min)) * Math.sin(theta)+(height*0.4/2.25),{
      duration : 1000
    })
    scaleOffset.value = withTiming(1, {duration : 1000})
  },[])
  return(
    <Animated.Image
    source={imagePath}
    style={[{
      width : height*0.4,
      height : height*0.4/(itemsLength),
      resizeMode : 'contain',
      position : 'absolute',
    },animatedStyles]}
    
    />
  )
}

const PizzaIngredients = ({ route, navigation }) => {
  const { imagePath } = route.params;
  

  const [ingredients, setIngredients] = React.useState({
      mushroom : 0,
      basil : 0,
      sausage : 0,
      onion : 0,
      broccoli : 0,
      zIndex : 0
  })

  const [accepted,setAccepted] = React.useState(false)
  const scaleOffset = useSharedValue(0);



  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleOffset.value }],
    };
  });

  const animatedStylesForThePlate = useAnimatedStyle(() => {
    const rotate = interpolate(scaleOffset.value, [0, 0.9], [0, 360 * 2]);
    const opacity = interpolate(scaleOffset.value, [0, 0.9], [0, 1]);
    const scale = interpolate(scaleOffset.value, [0, 0.9], [2, 1]);
    return {
      opacity,
      transform: [{ rotate: rotate + "deg" }, { scale }],
    };
  });




  React.useEffect(() => {
    console.log(ingredients)
  }, [ingredients]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F9F5F2",
        alignItems: "center",
      }}
    >
      <View style={[styles.pizza]}>


      <Image
        source={assets.plate}
        style={{
          width: width,
          height: height * 0.4,
          resizeMode: "contain",
          position : 'absolute',
          transform: [
            {
              scale: 1,
            },
          ],
        }}
      />

    <Image
        source={imagePath}
        style={{
          width:height * 0.4,
          height: height * 0.4,
          resizeMode: "contain",
          transform: [
            {
              scale: accepted ? 1.1 : 0.95,
            },{
              translateX : (width - height * 0.4)/2
            }
          ],
        }}
        onLayout={(e) => {
          console.log("y of the image : " + e.nativeEvent.layout.y)
        }}
       
      />


      
{
        ingredients.basil > 0 ? <Animated.View style={{
          backgroundColor :"transparent",
          width : width,
          height :height * 0.4, 
          zIndex : ingredients.zIndex ,
          transform :[{
            translateY : -height*0.4
          }]
        }}>
         {
           assets.basil.map((item,index) => {
             return(
              <IngredientsImage imagePath={item} index={index} itemsLength={assets.basil.length}/>
             )
           })
         }
        </Animated.View>: null
      }



{
        ingredients.sausage > 0 ? <Animated.View style={{
          backgroundColor :"transparent",
          width : width,
          height :height * 0.4, 
          zIndex : 2,
          position : 'absolute',
          transform :[{
            translateY : 0
          }]
        }}>
         {
           assets.sausage.map((item,index) => {
             return(
              <IngredientsImage imagePath={item} index={index} itemsLength={assets.sausage.length}/>
             )
           })
         }
        </Animated.View>: null
      }


{
        ingredients.onion > 0 ? <Animated.View style={{
          backgroundColor :"transparent",
          width : width,
          height :height * 0.4, 
          zIndex : 2,
          position : 'absolute',
          transform :[{
            translateY : 0
          }]
        }}>
         {
           assets.onion.map((item,index) => {
             return(
              <IngredientsImage imagePath={item} index={index} itemsLength={assets.onion.length}/>
             )
           })
         }
        </Animated.View>: null
      }

{
        ingredients.broccoli > 0 ? <Animated.View style={{
          backgroundColor :"transparent",
          width : width,
          height :height * 0.4, 
          zIndex : 2,
          position : 'absolute',
          transform :[{
            translateY : 0
          }]
        }}>
         {
           assets.broccoli.map((item,index) => {
             return(
              <IngredientsImage imagePath={item} index={index} itemsLength={assets.broccoli.length}/>
             )
           })
         }
        </Animated.View>: null
      }

{
        ingredients.mushroom > 0 ? <Animated.View style={{
          backgroundColor :"transparent",
          width : width,
          height :height * 0.4, 
          zIndex : 2,
          position : 'absolute',
          transform :[{
            translateY : 0
          }]
        }}>
         {
           assets.mushroom.map((item,index) => {
             return(
              <IngredientsImage imagePath={item} index={index} itemsLength={assets.mushroom.length}/>
             )
           })
         }
        </Animated.View>: null
      }
      </View>


      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.content}
          horizontal
          onLayout={(e) => {
            console.log("height of the scrollview = " + (((height * 0.4) - (height * 0.4)*0.9) + (width  *0.18)))
          }}  
        >
          <IngredientsButtons path={assets.basil[2]} index ={0} setState = {setIngredients} name ={"basil"} ingredientState = {ingredients} acceptedState={setAccepted} />
          <IngredientsButtons path={assets.sausage[3]} index={1} setState = {setIngredients} name ={"sausage"} ingredientState = {ingredients}/>
          <IngredientsButtons path={assets.onion[1]} index ={2} setState = {setIngredients} name ={"onion"} ingredientState = {ingredients}/>
          <IngredientsButtons path={assets.broccoli[1]} index ={3} setState = {setIngredients} name ={"broccoli"} ingredientState = {ingredients}/>
          <IngredientsButtons path={assets.mushroom[1]} index = {4} setState = {setIngredients} name = {"mushroom"} ingredientState = {ingredients}/>
        </ScrollView>
      </View>
        
      {/* <TouchableOpacity onPress={() => setIngredients({
        ...ingredients,
        basil : ingredients.basil+1
      })}>
        <Text>
          Add
        </Text>
      </TouchableOpacity> */}
        
    </View>
  );
};


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9F5F2",
    alignItems: "center",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  content: {
    marginTop: height * 0.4 + 10 + 100,
    height : width * 0.18
  },
  pizza: {
    margin: 32,
    width:width,
    height: height * 0.4,
  },
  plate: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
export default PizzaIngredients;
