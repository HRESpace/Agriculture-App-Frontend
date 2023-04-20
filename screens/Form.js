import {View,Text,TextInput,
  StyleSheet,Button,ScrollView,
  Alert,Image,TouchableOpacity,} from "react-native";
import {firebase} from '../Config';
import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as Camera from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from '@react-navigation/native';
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens";



export default function Form(props) {
  const [hasGalleryPermission, setHasGalleryPermission] = React.useState(null);
  const [hasLocationPermission, setHasLocationPermission] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [location, setLocation] = React.useState();
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cropType, setCropType] = React.useState("");
  const [cropSeason, setCropSeason] = React.useState("");
  const [villageDistrict, setVillageDistrict] = React.useState("");
  const [state, setState] = React.useState("");
  const [ownerName, setOwnerName] = React.useState("");
  const [soilType, setSoilType] = React.useState("");
  const [previousCrop, setPreviousCrop] = React.useState("");
  const [yieldHistory, setYieldHistory] = React.useState("");
  const { ExifInterface } = MediaLibrary;

    React.useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                console.log(snapshot.data());
                setEmail(snapshot.data());
            } else {
                console.log("User does not exist.")
            }
        })
    }, [])
  
  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status, typeof status, "permission");
      setHasGalleryPermission(galleryStatus === "granted");
      setHasLocationPermission(status == "granted");
    })();
  }, []);

  const getLocation = async () => {
    console.log("called");

    if (!hasLocationPermission) {
      console.log("returning");
      return;
    }
    console.log("forward");
    let { coords } = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    if (coords) {
      console.log("Coordinates fetched: ",coords)
      var lat = coords['latitude'];
      setLatitude(lat);
      var long = coords['longitude'];
      setLongitude(long);
      var location = 'Longitude: ' + longitude + '\nLatitude: ' + latitude;
      setLocation(location);
    }
  };

  const pickImage = async () => {

    const { status } = await Camera.requestCameraPermissionsAsync();
    // const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
      // await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      exif: true,
      quality: 1,
      // limit the image size to 1MB
      // You can adjust the size limit as per your requirement
      base64: true,
      quality: 0.5,
      maxFileSize: 1024 * 1024, // 1MB
      // set the output format to JPEG
      // remove this option if you want the default format
      type: 'image/jpeg'
    });

    console.log(result.canceled);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }
  };
  
  const navigation = useNavigation();

  const uploadImage = async () => {
    console.log("Upload of image called.");
    const response = await fetch(image);
    const blob = await response.blob();

    // Create a reference to the Firebase Storage bucket
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child("images/" + image);

    // Upload the image to the Firebase Storage
    await imageRef.put(blob);

    // Add location to the image metadata
    await getLocation();
    const metadata = {
      customMetadata: {
        'Longitude': longitude,
        'Latitude': latitude
      }
    };

    //await imageRef.updateMetadata(metadata);
    await imageRef.updateMetadata(metadata);
    // Get the URL of the uploaded image
    const temp = await imageRef.getDownloadURL();
    
    setImageUrl(temp);
  };

  const postData = async () => {
    console.log("Post Called.");
    await uploadImage();
    const data = {
      user_name: name,
      imgUri: imageUrl,
      date: date,
      email_id : email.email,
      crop_type: cropType,
      crop_season: cropSeason,
      village_district: villageDistrict,
      state: state,
      field_owner: ownerName,
      soil_type: soilType,
      prev_crop: previousCrop,
      yield_history: yieldHistory
    };
    console.log(data);
    try {
      await fetch("https://sudhir0789.pythonanywhere.com/userapi/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        Alert.alert("Data is Created.");
      });
    } catch (error) {
      console.error(error, data, "error");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Enter the details:</Text>
        <Text style={styles.normalText}>Name</Text>
        <TextInput
          onChangeText={(v) => setName(v)}
          value={name}
          style={styles.textInput}
          maxLength = {50}
          required = {true}
        />
        <Text style={styles.normalText}>Date</Text>
        <TextInput
          onChangeText={(v) =>{setDate(v);}}
          value={date}
          style={styles.textInput}
          // Standard ISO date format.
          placeholder="YYYY-MM-DD"
          maxLength={10}
          required={true}
        />
        <Text style={styles.normalText}>Crop Type</Text>
        <TextInput
          onChangeText={(v) => setCropType(v)}
          value={cropType}
          style={styles.textInput}
          maxLength={50}
          required={true}
        />
        <Text style={styles.normalText}>Crop Season</Text>
        <TextInput
          onChangeText={(v) => setCropSeason(v)}
          value={cropSeason}
          style={styles.textInput}
          maxLength={50}
          required={true}
        />
        <Text style={styles.normalText}>Village and District Name</Text>
        <TextInput
          onChangeText={(v) => setVillageDistrict(v)}
          value={villageDistrict}
          style={styles.textInput}
          maxLength={100}
          required={true}
        />
        <Text style={styles.normalText}>Name of the State</Text>
        <TextInput
          onChangeText={(v) => setState(v)}
          value={state}
          style={styles.textInput}
          maxLength={50}
          required={true}
        />
        <Text style={styles.normalText}>Name of the Field owner</Text>
        <TextInput
          onChangeText={(v) => setOwnerName(v)}
          value={ownerName}
          style={styles.textInput}
          maxLength={50}
          required={true}
        />
        <Text style={styles.normalText}>Soil Type</Text>
        <TextInput
          onChangeText={(v) => setSoilType(v)}
          value={soilType}
          style={styles.textInput}
          maxLength={50}
          required={true}
        />
        <Text style={styles.normalText}>Previous Crop</Text>
        <TextInput
          onChangeText={(v) => setPreviousCrop(v)}
          value={previousCrop}
          style={styles.textInput}
          maxLength={50}
          required={true}
        />
        <Text style={styles.normalText}>Previous yield history</Text>
        <TextInput
          onChangeText={(v) => setYieldHistory(v)}
          value={yieldHistory}
          style={styles.textInput}
          maxLength={250}
          required={true}
        />
        {location && <Text>{location}</Text>}
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => {
            getLocation();
          }}
        >
        <Text style={{ color: "white" }}>Get the Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => {
            pickImage();
          }}
        >
        <Text style={{ color: "white" }}>Take an Image</Text>
        </TouchableOpacity>
        <Image style={{ height: 200 }} source={{ uri: image }} />
        <TouchableOpacity onPress={postData} style={styles.button}>
        <Text style={{ color: "white" }}>POST DATA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Details")}
          style={styles.button}
        >
        <Text style={{ color: "white" }}>All Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 12,
  },
  container: {
    padding : 15,
    margin: 12,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
  },
  normalText: {
    marginVertical: 4,
  },
  button: {
    marginTop: 12,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
  },
  imagePicker: {
    marginVertical: 12,
    padding: 6,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});
