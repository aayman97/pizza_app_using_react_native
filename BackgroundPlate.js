import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Dimensions, FlatList, Image } from 'react-native';
import Animated,{ useSharedValue,useAnimatedStyle, useAnimatedScrollHandler, interpolate, runOnUI, runOnJS} from 'react-native-reanimated';
import { transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { assets } from './data';

const { height, width } = Dimensions.get("screen");

const BackgroundPlate = ({Offset, imagePath}) => {

    const inputRange = [0,assets.pizza.length*width]



    const animatedStyleForRotation = useAnimatedStyle(()=> {
        const rotate = interpolate(Offset.value,inputRange,[0,(360)])
    return {
        transform : [{
            rotate : rotate+ 'deg'
        }]
    }
    })

    return(
        <Animated.View style={[{
            position : 'absolute',
            alignItems : 'center'
          },animatedStyleForRotation ]}>
            <View style=
            {{backgroundColor : 'transparent', 
              height : height*0.55,
              width : height*0.55,
               position : 'absolute',
               transform : [{
                   translateY : -height*(0.15/2)
               }]
               }}>
                
                <Image
                    source={assets.basil[0]}
                    style={{
                        height : (height*0.55)/8,
                        width : (height*0.55)/8,
                        resizeMode : 'contain',
                        transform : [{
                            scale : 0.7
                        },
                        {
                            translateX :  (height*0.55)*(1.25/2)
                        }
                       
                    ]
                    }}
                />

                <Image
                    source={assets.bread[0]}
                    style={{
                        height : (height*0.55)/8,
                        width : (height*0.55)/8,
                        resizeMode : 'contain',
                        transform : [{
                            scale : 0.7
                        },
                        {
                            translateX :  (height*0.55)*0.15
                        },
                        {
                            translateY : ((((height*0.55)/8)*0.7)/4)/2
                        }
                       
                    ]
                    }}
                />

            <Image
                    source={assets.broccoli[0]}
                    style={{
                        height : (height*0.55)/8,
                        width : (height*0.55)/8,
                        resizeMode : 'contain',
                        transform : [{
                            scale : 0.7
                        },
                        {
                            translateX :  (height*0.55)*1.15
                        },
                        {
                            translateY : -((height*0.55)/8)
                        }
                    ]
                    }}
                />

            <Image
                    source={assets.mushroom[0]}
                    style={{
                        height : (height*0.55)/8,
                        width : (height*0.55)/8,
                        resizeMode : 'contain',
                        transform : [{
                            scale : 0.7
                        },
                        {
                            translateX :  (height*0.55)*1.25
                        },
                        {
                            translateY : ((height*0.55)/8)*0.7
                        }
                    ]
                    }}
                />

            <Image
                    source={assets.onion[0]}
                    style={{
                        height : (height*0.55)/8,
                        width : (height*0.55)/8,
                        resizeMode : 'contain',
                        transform : [{
                            scale : 0.7
                        },
                        {
                            translateX :  (height*0.55)*0.05
                        },
                        {
                            translateY :( -(height*0.55)/8)
                        }
                        
                    ]
                    }}
                />

        <Image
                    source={assets.sausage[0]}
                    style={{
                        height : (height*0.55)/8,
                        width : (height*0.55)/8,
                        resizeMode : 'contain',
                        transform : [{
                            scale : 0.7
                        },
                        {
                            translateX :  (height*0.55)*0.15
                        },
                        {
                            translateY : ((((height*0.55)/8)*0.7)*4)/2
                        }
                    ]
                    }}
                />

                <Image
                    source={assets.extra[0]}
                    style={{
                        height : (height*0.55)/8,
                        width : (height*0.55)/8,
                        resizeMode : 'contain',
                        transform : [{
                            scale : 0.7
                        },
                        {
                            translateX :   (height*0.55)*1.1
                        },
                        {
                            translateY : -((height*0.55)/8)*0.7/8
                        }
                        
                    ]
                    }}
                />

            <Image
                    source={assets.extra[1]}
                    style={{
                        height : (height*0.55)/8,
                        width : (height*0.55)/8,
                        resizeMode : 'contain',
                        transform : [{
                            scale : 0.7
                        },
                        {
                            translateX :  (height*0.55)*(1.25/2)
                        },
                       
                    ]
                    }}
                />

            </View>
          <Image
              source= {imagePath}
              style={{
                width : width,
                height : height*0.4,
                resizeMode : 'contain'
              }}
              />
          </Animated.View>
    )
}

export default BackgroundPlate;