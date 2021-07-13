import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { View, Text, StatusBar, LogBox,Platform } from "react-native";
import Dashboard from "./screen/Dashboard";
import firebase from "firebase";
import { firebaseConfig } from "./db/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as ImagePicker from 'expo-image-picker';
import Orther from "./screen/Orther";


const stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}



export default function App() {


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <stack.Navigator >
          <stack.Screen name="Dashboard" component={Dashboard} options={{
          title: 'JD Dashboard',
          headerStyle: {
            backgroundColor: '#000328',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <stack.Screen name="Orther" component={Orther} options={{
          title: 'JD Customize',
          headerStyle: {
            backgroundColor: '#000328',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        </stack.Navigator>
       
      </NavigationContainer>
    </View>
  );
}
