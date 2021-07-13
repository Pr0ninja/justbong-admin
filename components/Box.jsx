import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { View, Text, Dimensions } from 'react-native'

const height = Dimensions.get("window").height;

export default function Box({children,height1}) {
    return (
        <View style={{height:height1,backgroundColor:"white",margin:height*.02,borderRadius:height*.02,elevation:10,overflow:'hidden'}}>
            <LinearGradient
            colors={["#000328","#00458E"]}
            style={{flex:1,padding:height*0.01}}
            >
                 {children}

            </LinearGradient>
           
        </View>
    )
}
