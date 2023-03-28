import { View, Text, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";

export default function History() {
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch("http://10.0.2.2:8000/userapi/");
        let json = await res.json();
        setUserDetails(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  console.log(userDetails);
  return (
    <ScrollView>
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
              <Text style={{ fontWeight: "bold" }}>Time: </Text>
              <Text>{item.time}</Text>
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
              <Text style = {{flex:1, flexWrap:'wrap'}}>
              <Text style={{ fontWeight: "bold" }}>Crop Stage:</Text>{'\n'}
              {item.crop_stage}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Plot Area: </Text>
              <Text>{item.plot_area} acres</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Village: </Text>
              <Text>{item.village}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>District/Mandal Name: </Text>
              <Text>{item.district_or_mandal_name}</Text>
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
              <Text style={{ fontWeight: "bold" }}>Irrigated/Dry land:</Text>
              <Text>{item.land_type}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Soil Type:</Text>
              <Text>{item.soil_type}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Soil Moisture:</Text>
              <Text>{item.soil_moisture}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Previous crop:</Text>
              <Text>{item.prev_crop}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Approximate Yield Estimate:</Text>
              <Text>{item.approx_yield} kg</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Previous Yield History:</Text>
              <Text>{item.yield_history}</Text>
            </View>
            {/* <View style={{ flexDirection: "row", flexShrink: 1 }}>
              <Text style = {{flex:1, flexWrap:'wrap'}} >
              <Text style={{ fontWeight: "bold" }}>Location:</Text>{'\n'} 
              {item.location}
              </Text>
            </View> */}
            <Text style={{ fontWeight: "bold" }}>Image</Text>
            <Image style={{height: 200 }} source={{ uri: item.imgUri }} />
          </View>
        );
      })}
    </ScrollView>
  );
}
