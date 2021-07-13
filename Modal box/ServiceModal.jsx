import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState,} from "react";
import { View, Text, Modal, Alert, ScrollView, Dimensions, Pressable,ToastAndroid,Image } from "react-native";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

import Box from "../components/Box";
import { uploadImage } from "../utils/imageUpload";
const height = Dimensions.get("window").height;

export default function ServiceModal({ isModalOpen, setServiceModel }) {
  const [servicedata, setServiceData] = useState([]);

  const deleteHandelar=(id)=>{
            firebase.firestore().collection("Services").doc(id)
            .delete()
            .then(() => {
              console.log('User deleted!');
              ToastAndroid.show("Your data is Deleted !", ToastAndroid.SHORT);
            });
  }

  const pickImage = async (id) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      uploadImage(result.uri, id,"Services");
    }
  };


  useEffect(() => {
    firebase
      .firestore()
      .collection("Services")
      .onSnapshot((querySnapshot) => {
        const user = [];

        querySnapshot.forEach((item) => {
          user.push({
            ...item.data(),
            key: item.id,
          });
        });

        setServiceData(user);
      });

    return () => {};
  }, []);

 
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={() => {
        setServiceModel(!isModalOpen);
      }}
    >
      <View style={{ flex: 1, }}>
        <LinearGradient
          colors={["#663177", "#C63F7B"]}
          style={{ flex: 1, borderRadius: 10 }}
        >
          <View style={{flexDirection:'row',backgroundColor:'red',justifyContent:'space-between',margin:10,borderRadius:10,height:40,alignItems:'center',padding:15}}> 
            <Text style={{color:"white"}}>User Data</Text>
            <Text style={{color:"white"}}>Action</Text>
          </View>
          <ScrollView>
            {servicedata.map((item, index) => (
              <View key={index}>
                <Box height1={height * 0.3}>
                  <View style={{ flexDirection:"row" }}>
                    <View style={{justifyContent:'center',flex:1}}>
                    
                      <Text style={{ color: "white" }}><Text style={{ color: "red",fontSize:17 }}>Title : </Text> {item.title}</Text>
                      <Text style={{ color: "white" }}><Text style={{ color: "red",fontSize:17 }}>Category : </Text>{item.category}</Text>
                      <Text style={{ color: "white" }}><Text style={{ color: "red",fontSize:17 }}>Description : </Text>{item.description}</Text>
                   
                      <Text style={{ color: "white" }}><Text style={{ color: "red",fontSize:17 }}>Phone : </Text>{item.phone}</Text>
                      <Text style={{ color: "white" }}><Text style={{ color: "red",fontSize:17 }}>Place : </Text>{item.place}</Text>
                      <Text style={{ color: "white" }}>
                      <Text style={{ color: "red",fontSize:17 }}>Organization : </Text>{item.organization}
                      </Text>
                    </View>
                    <View>
                        <Pressable onPress={()=>{deleteHandelar(item.key)}}>
                            <Text style={{color:'red'}}>DELETE</Text>
                        </Pressable>
                        <Pressable onPress={()=>{pickImage(item.key)}} style={{width:120,height:80,alignItems:"center",justifyContent:"center",backgroundColor:'pink',marginTop:10}}>
                          {
                            item.image && <Image source={{uri:item.image}} style={{width:120,height:80}} resizeMode="cover" />
                          }
                        </Pressable>
                      
                    </View>
                  </View>
                </Box>
              </View>
            ))}
          </ScrollView>
        </LinearGradient>
      </View>
    </Modal>
  );
}
