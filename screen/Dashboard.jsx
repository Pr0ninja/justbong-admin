import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import firebase from 'firebase'
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  BackHandler
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Box from "../components/Box";
import ServiceModal from "../Modal box/ServiceModal";
import { useState,useEffect } from "react";
import CategoryModal from "../Modal box/CategoryModal";

const height = Dimensions.get("window").height;


const Dashboard = ({navigation}) => {

    const [serviceModal,setServiceModal]=useState(false);
    const [isCatModalOpen,setCatModel]=useState(false);

    const [isLoading,setIsLoading]=useState(false)

    const[title,setTitle]=useState('');
    const[orgs,setOrgs]=useState('');
    const[phone,setPhone]=useState('');
    const[description,setDescription]=useState('');
    const[place,setPlace]=useState('');
    const[category,setCategory]=useState('');
    const[image,setImage]=useState('');


    const SubmitHandelar=()=>{
      if(title && orgs && description && place && category){
        setIsLoading(true);
      firebase.firestore().collection('Services').add({
        title:title,
        organization:orgs,
        phone:phone,
        description:description,
        place:place,
        category:category,
        image:null,
        fullDetails:true

      }).then(()=>{
        setIsLoading(false);
        ToastAndroid.show("Your data is Added !", ToastAndroid.SHORT);
        setTitle('');
        setOrgs('');
        setPhone('');
        setDescription('');
        setPlace('');
        setCategory('');
        setImage('')
      })

      }else{
        alert('Fill all inputs properly');
      }
      

    }

useEffect(()=>{
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();

},[])

   
  return (
    <View style={{ flex: 1,position:'relative' }}>
      
        <ServiceModal
            isModalOpen={serviceModal}
            setServiceModel={setServiceModal}
        />

        <CategoryModal
        isCatModalOpen={isCatModalOpen}
        setCatModel={setCatModel}
        />
      <LinearGradient
        // Button Linear Gradient
        colors={["#9D80CB", "#F7C2E6"]}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Box height1={height * 0.2}>
            <View>
              <Text style={{ fontSize: 20, color: "white" }}>Add Category</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent:"space-around",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
              onPress={()=>{setCatModel(true)}}
              style={{ alignItems: "center" }}>
                <Ionicons name="add-circle-outline" size={50} color="white" />
                <Text style={{ color: "white" }}>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: "center" }}>
                <Ionicons name="create-outline" size={50} color="white" />
                <Text style={{ color: "white" }}>List</Text>
              </TouchableOpacity>

             

              <TouchableOpacity  style={{ alignItems: "center" }}>
                <AntDesign name="delete" size={50} color="white" />
                <Text style={{ color: "white" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Box>
         
         <Box height1={height * 0.2}>
         <View>
           <Text style={{color:'white',fontSize:20}}>Customize App Zone</Text>
         </View>
         <View style={{flex:1,alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>

           <Pressable onPress={()=>{navigation.navigate('Orther')}} style={{height:20,borderColor:'white',borderWidth:2,alignItems:"center",justifyContent:'center',margin:10,padding:20,borderRadius:10}}>
             <Text style={{color:'white'}}>Image Change</Text>

           </Pressable>
           <View style={{height:20,borderColor:'white',borderWidth:2,alignItems:"center",justifyContent:'center',margin:10,padding:20,borderRadius:10}}>
             <Text style={{color:'white'}}>Content Change</Text>

           </View>

         </View>

         </Box>
        

          <Box height1={height * 0.7}>
            <Text style={{ fontSize: 20, color: "white" }}>
              Add New Service
            </Text>
              {
                isLoading ?  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size="large" color="red" />
                </View>:<>

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "white" }}>Title</Text>
              <TextInput
                placeholder=" "
                onChangeText={(e)=>{setTitle(e)}}
                value={title}
                style={{
                  color: "white",
                  borderColor: "white",
                  borderWidth: 3,
                  borderRadius: 10,
                  paddingLeft: 10,
                }}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "white" }}>Name Orgs/Person</Text>
              <TextInput
               onChangeText={(e)=>{setOrgs(e)}}
               value={orgs}
                placeholder=" "
                style={{
                  color: "white",
                  borderColor: "white",
                  borderWidth: 3,
                  borderRadius: 10,
                  paddingLeft: 10,
                }}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "white" }}>Phone Number</Text>
              <TextInput
               onChangeText={(e)=>{setPhone(e)}}
               value={phone}
                placeholder=" "
                keyboardType='numeric'
                style={{
                  color: "white",
                  borderColor: "white",
                  borderWidth: 3,
                  borderRadius: 10,
                  paddingLeft: 10,
                }}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "white" }}>Description</Text>
              <TextInput
                multiline={true}
                onChangeText={(e)=>{setDescription(e)}}
                value={description}
                placeholder=" "
                style={{
                  height: height * 0.1,
                  color: "white",
                  borderColor: "white",
                  borderWidth: 3,
                  borderRadius: 10,
                  paddingLeft: 10,
                }}
              />
            </View>
            <View style={{marginTop: 10,flex:1,flexDirection:'row',justifyContent:'center' }}>
            <View style={{flex:1}}>
              <Text style={{ color: "white" }}>Place</Text>
              <TextInput
                 onChangeText={(e)=>{setPlace(e)}}
                 value={place}
                placeholder=" "
                style={{
                  color: "white",
                  borderColor: "white",
                  borderWidth: 3,
                  borderRadius: 10,
                  paddingLeft: 10,
                }}
              />
            </View>
            <View style={{flex:1,marginLeft:5}}>
              <Text style={{ color: "white" }}>Category Id</Text>
              <TextInput
               onChangeText={(e)=>{setCategory(e)}}
               value={category}
                placeholder=" "
               
                style={{
                  color: "white",
                  borderColor: "white",
                  borderWidth: 3,
                  borderRadius: 10,
                  paddingLeft: 10,
                }}
              />
            </View>

            </View>
            <View style={{alignItems:"center",justifyContent:"center",marginTop:10}}>
                    <Pressable onPress={()=>{SubmitHandelar();}} style={{height:40,width:"100%",alignItems:'center',justifyContent:'center',borderRadius:10,borderColor:'white',borderWidth:2}}>
                            <Text style={{color:'white',fontSize:20}}>Submit</Text>
                    </Pressable>
            </View>
                </>
              }
            
            
           

            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:10}}>
            <TouchableOpacity onPress={()=>{
                setServiceModal(true);
            }} style={{ alignItems: "center" }}>
                <Ionicons name="create-outline" size={30} color="white" />
                <Text style={{ color: "white" }}>List</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: "center" }}>
                <MaterialIcons name="update" size={30} color="white" />
                <Text style={{ color: "white" }}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: "center" }}>
                <AntDesign name="delete" size={30} color="white" />
                <Text style={{ color: "white" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Box>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default Dashboard;
