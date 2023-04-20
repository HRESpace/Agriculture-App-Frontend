import { 
  View, 
  Text, 
  Image, 
  ScrollView,
  TouchableOpacity, } from "react-native";
import React, { useState, useEffect } from "react";
import Color from "../Constants/Color";
import FontSize from "../Constants/FontSize";
import Spacing from "../Constants/Spacing";
import * as Font from "expo-font";
import {firebase} from "../Config";

async function loadFonts()
{
    await Font.loadAsync({
        'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'poppins-semiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });
}

export default function History() {
  console.log(userDetails);
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.email).get()
    .then((snapshot) => {
      if(snapshot.exists){
        console.log(snapshot.data());
        setEmail(snapshot.data());
      } else {
        console.log("User does not exist.")
      }
    })
  }, [])
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch('https://sudhir0789.pythonanywhere.com/userapi/');
        let json = await res.json();
        let filteredData = json.filter(item => item.email_id === email);
        setUserDetails(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [email]);
  return (
    <ScrollView>
      <View style = {{
            paddingHorizontal : Spacing * 2,
            paddingTop : Spacing * 7,
            flexDirection: "column", // added flexDirection style
            alignItems: "center", // added alignItems style to center the elements vertically
        }}>
            <TouchableOpacity 
              onPress={async () => {
                // const email = userDetails.email_id;
                let res = 
                await fetch("https://sudhir0789.pythonanywhere.com/download-data/${email}");
                let data = await res.blob();
                const url = URL.createObjectURL(data);
                Linking.openURL(url);
              }}
              style = {{
                  backgroundColor : Color.lightPrimary,
                  paddingVertical : Spacing * 1.5,
                  paddingHorizontal : Spacing * 2,
                  width : "48%",
                  borderRadius : Spacing,
                  shadowColor : Color.primary,
                  shadowOffset : {
                      width : 0,
                      height : Spacing
                  },
                  shadowOpacity : 0.3,
                  shadowRadius : Spacing,
              }}
            >
                  <Text 
                      style= {{
                          color : Color.text,
                          fontSize : FontSize.large,
                          textAlign : "center",
                          fontWeight : "bold",
                          fontFamily: Font["poppins-bold"], 
                      }}
                  >Download File</Text>
            </TouchableOpacity>
        </View>
      {userDetails.map((item, key) => {
        return (
          <View style={{ margin: 12, padding: 12, borderWidth: 1 }} key={key}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Name: </Text>
              <Text>{item.user_name}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Date: </Text>
              <Text>{item.date}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Crop Type: </Text>
              <Text>{item.crop_type}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Crop Season: </Text>
              <Text>{item.crop_season}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Village and District: </Text>
              <Text>{item.village}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>State:</Text>
              <Text>{item.state}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Field owner name:</Text>
              <Text>{item.field_owner}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Soil Type:</Text>
              <Text>{item.soil_type}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Previous crop:</Text>
              <Text>{item.prev_crop}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Previous Yield History:</Text>
              <Text>{item.yield_history}</Text>
            </View>
            <Text style={{ fontWeight: "bold" }}>Image</Text>
            <Image style={{height: 200 }} source={{ uri: item.imgUri }} />
          </View>
        );
      })}
    </ScrollView>
  );
}
