import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Alert,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Pressable,
} from "react-native";
import firebase from "firebase";
import Box from "../components/Box";
const height = Dimensions.get("window").height;

export default function CategoryModal({ isCatModalOpen, setCatModel }) {
  const [cName, setCName] = useState();
  const [cId, setCId] = useState();
  const [catData, setCatData] = useState([]);

  const submitHandelar = async () => {
    if(cName&&cId){
      const data = await firebase.firestore().collection("Category").add({
        name: cName,
        id: cId,
      });
  
      setCName('');
      setCId('')
  
      ToastAndroid.show("Your data is Added !", ToastAndroid.SHORT);

    }else{
      alert('Enter all field')
    }
   
  };

  const deleteHandelar=(id)=>{
    firebase.firestore().collection("Category").doc(id)
            .delete()
            .then(() => {
              console.log('User deleted!');
              ToastAndroid.show("Your data is Deleted !", ToastAndroid.SHORT);
            });
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection("Category")
      .onSnapshot((querySnapshot) => {
        let category = [];

        querySnapshot.forEach((item) => {
          category.push({
            ...item.data(),
            key: item.id,
          });
        });

        setCatData(category);
      });

    return () => {};
  }, []);



  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isCatModalOpen}
      onRequestClose={() => {
        setCatModel(!isCatModalOpen);
      }}
    >
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#A770EF", "#CF8BF3", "#FDB99B"]}
          style={{ flex: 1, borderRadius: 10 }}
        >
          <ScrollView>
            <Box height1={height * 0.3}>
              <View style={{ marginTop: 10, justifyContent: "center" }}>
                <Text style={{ color: "white" }}>Category Name</Text>
                <TextInput
                  placeholder=" "
                  onChangeText={(e) => {
                    setCName(e);
                  }}
                  value={cName}
                  style={{
                    color: "white",
                    borderColor: "white",
                    borderWidth: 3,
                    borderRadius: 10,
                    paddingLeft: 10,
                  }}
                />

                <Text style={{ color: "white" }}>Category Id</Text>
                <TextInput
                  onChangeText={(e) => {
                    setCId(e);
                  }}
                  keyboardType='numeric'
                  value={cId}
                  placeholder=" "
                  style={{
                    color: "white",
                    borderColor: "white",
                    borderWidth: 3,
                    borderRadius: 10,
                    paddingLeft: 10,
                  }}
                />
                <View style={{ marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={() => {
                      submitHandelar();
                    }}
                    style={{
                      borderColor: "white",
                      borderWidth: 2,
                      height: height * 0.05,
                      borderRadius: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white" }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Box>
            <ScrollView>
              <Box height1={height * 0.7}>
                <View
                  style={{
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "red",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "white" }}>Id</Text>
                  <Text style={{ color: "white" }}>Category Name</Text>
                  <Text style={{ color: "white" }}>Action</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                  {catData.map((item, index) => (
                    <View key={index} style={{flexDirection:'row',justifyContent:"space-around",margin:10}}>
                      
                      <Text style={{ color: "white" }}>{item.id}</Text>
                      <Text style={{ color: "white" }}>{item.name}</Text>
                      <Pressable onPress={()=>{deleteHandelar(item.key)}}>
                        <Text style={{color:'red'}}>DELETE</Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              </Box>
            </ScrollView>
          </ScrollView>
        </LinearGradient>
      </View>
    </Modal>
  );
}
