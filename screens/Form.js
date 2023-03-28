import {View,Text,TextInput,
  StyleSheet,Button,ScrollView,
  Alert,Image,TouchableOpacity,} from "react-native";
import {firebase} from '../Config';
import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
// import { Location } from "expo";
import * as Location from "expo-location";
// import { ExifInterface } from 'expo-image-picker';
import * as Camera from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from '@react-navigation/native';
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens";



export default function Form(props) {
  const [hasGalleryPermission, setHasGalleryPermission] = React.useState(null);
  const [hasLocationPermission, setHasLocationPermission] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [cropType, setCropType] = React.useState("");
  const [cropSeason, setCropSeason] = React.useState("");
  const [cropStage, setCropStage] = React.useState("");
  const [plotArea, setPlotArea] = React.useState(null);
  const [village, setVillage] = React.useState("");
  const [districtMandal, setDistrictMandal] = React.useState("");
  const [state, setState] = React.useState("");
  const [ownerName, setOwnerName] = React.useState("");
  const [landType, setLandType] = React.useState("");
  const [soilType, setSoilType] = React.useState("");
  const [soilMoisture, setSoilMoisture] = React.useState("");
  const [previousCrop, setPreviousCrop] = React.useState("");
  const [yieldEstimate, setYieldEstimate] = React.useState(null);
  const [yieldHistory, setYieldHistory] = React.useState("");
  const { ExifInterface } = MediaLibrary;
  
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
      var latitude = coords['latitude'];
      setLatitude(latitude);
      var longitude = coords['longitude'];
      setLongitude(longitude);
      //var location = 'Longitude: ' + longitude + '\nLatitude: ' + latitude;
      //setLocation(location);
    }
  };

  const pickImage = async () => {
    getLocation();
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

    // // Upload the compressed image to the Firebase Storage
    // await imageRef.put(compressedBlob.uri, { contentType: "image/jpeg" });

    // Upload the image to the Firebase Storage
    await imageRef.put(blob);

    // Add location to the image metadata
    getLocation();
    const metadata = {
      customMetadata: {
        'Longitude': longitude,
        'Latitude': latitude
      }
    };

    //await imageRef.updateMetadata(metadata);
    await imageRef.updateMetadata(metadata)
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
      crop_type: cropType,
      crop_season: cropSeason,
      crop_stage: cropStage,
      plot_area: plotArea,
      village: village,
      district_or_mandal_name: districtMandal,
      state: state,
      field_owner: ownerName,
      land_type: landType,
      soil_type: soilType,
      soil_moisture: soilMoisture,
      prev_crop: previousCrop,
      approx_yield: yieldEstimate,
      yield_history: yieldHistory
    };
    console.log(data);
    try {
      await fetch("http://10.0.2.2:8000/userapi/", {
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
        <Text style={styles.normalText}>Time(in 24 HR format)</Text>
        <TextInput
          onChangeText={(v) => setTime(v)}
          value={time}
          style={styles.textInput}
          placeholder="HH:MM"
          maxLength={5}
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
        <Text style={styles.normalText}>Stage of Crop</Text>
        <TextInput
          onChangeText={(v) => setCropStage(v)}
          value={cropStage}
          style={styles.textInput}
          maxLength={250}
          required={true}
        />
        <Text style={styles.normalText}>Area of the Plot (in acres)</Text>
        <TextInput
          onChangeText={(v) => setPlotArea(parseFloat(v))}
          value={plotArea ? plotArea.toString() : ''}
          //value={plotArea.toString()}
          style={styles.textInput}
          keyboardType="numeric"
          required={true}
        />
        <Text style={styles.normalText}>Village Name</Text>
        <TextInput
          onChangeText={(v) => setVillage(v)}
          value={village}
          style={styles.textInput}
          maxLength={50}
          required={true}
        />
        <Text style={styles.normalText}>Name of District/Mandal</Text>
        <TextInput
          onChangeText={(v) => setDistrictMandal(v)}
          value={districtMandal}
          style={styles.textInput}
          maxLength={50}
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
        <Text style={styles.normalText}>Name of Owner of Field</Text>
        <TextInput
          onChangeText={(v) => setOwnerName(v)}
          value={ownerName}
          style={styles.textInput}
          maxLength={50}
          required={true}
        />
        <Text style={styles.normalText}>Irrigated/Dry Land</Text>
        <TextInput
          onChangeText={(v) => setLandType(v)}
          value={landType}
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
        <Text style={styles.normalText}>Soil Moisture</Text>
        <TextInput
          onChangeText={(v) => setSoilMoisture(v)}
          value={soilMoisture}
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
        <Text style={styles.normalText}>Approximate Yield Estimate(in kgs)</Text>
        <TextInput
          onChangeText={(v) => setYieldEstimate(parseFloat(v))}
          value={yieldEstimate ? yieldEstimate.toString() : ''}
          //value={yieldEstimate.toString()}
          style={styles.textInput}
          keyboardType="numeric"
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

        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => {
            pickImage();
          }}
        >
        <Text style={{ color: "white" }}>Take an Image</Text>
        </TouchableOpacity>
        <Image style={{ height: 200 }} source={{ uri: image }} />
        {/* {location && <Text>{location}</Text>} */}

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
