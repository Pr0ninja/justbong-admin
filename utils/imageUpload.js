import firebase from 'firebase';


export const  uploadImage = async (uri, newId) => {
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
          .collection("Services")
          .doc(newId)
          .update({
            image: downloadUrl,
          })
          .then(() => {
            console.log("User updated!");
          });
      });
    });

  };