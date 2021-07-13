import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";

import firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

export default function Orther() {
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState([]);

  const date = "mynamepro-ninja";

  const uploadImage = async (uri, newId) => {
    const uploaduri = uri;
    let filename = uploaduri.substring(uploaduri.lastIndexOf("/") + 1);

    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = await firebase.storage().ref().child(filename);
    let newData;
    ref.put(blob).then(() => {
      ref.getDownloadURL().then((downloadUrl) => {
        console.log("Downloaded is url is" + downloadUrl);
        firebase
          .firestore()
          .collection("banner")
          .doc(newId)
          .update({
            banner: downloadUrl,
          })
          .then(() => {
            console.log("User updated!");
          });
      });
    });

  };

  const pickImage = async (id) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      uploadImage(result.uri, id);
    }
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("banner")
      .onSnapshot((querySnapshot) => {
        let category = [];

        querySnapshot.forEach((item) => {
          category.push({
            ...item.data(),
            key: item.id,
          });
        });

        setImageData(category);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 20 }}>Just Bong Banner Customize</Text>
      </View>
      <View style={{width:"100%",height:200}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {imageData.map((item, index) => (
            <Pressable
              onPress={() => {
                pickImage(item.key);
              }}
              key={index}
            >
              <View
                style={{
                  margin: 10,
                  elevation: 5,
                  height: 150,
                  width: 300,
                  backgroundColor: "#000328",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.banner && (
                  <Image
                    source={{ uri: item.banner }}
                    style={{ width: 300, height: 150 }}
                    resizeMode="cover"
                  />
                )}
              </View>
              <View style={{alignItems:"center"}}>
               <Text>Change Banner {index+1}</Text>
              </View>
              
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
