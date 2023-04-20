import {
    Dimensions,
    ImageBackground, 
    SafeAreaView, 
    StyleSheet, 
    Text,
    TouchableOpacity, 
    View,
} from "react-native";
import React from "react";
import Spacing from "../Constants/Spacing";
import FontSize from "../Constants/FontSize";
import Color from "../Constants/Color";
import * as Font from 'expo-font';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import { useNavigation } from "@react-navigation/native";
async function loadFonts() {
  await Font.loadAsync({
    'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'poppins-semiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });
}

const {height} = Dimensions.get("window")

const Auth= () => {
    const navigation = useNavigation();
    return (
    <SafeAreaView>
        <View>
            <ImageBackground style={{
                height : height/2.5,
            }}
            resizeMode="contain"
            source={require("../assets/icon.png")}/>
        <View style = {{
            paddingHorizontal: Spacing * 4,
            paddingTop: Spacing * 4,
        }}>
            <Text style = {{
                fontSize : FontSize.xLarge,
                color : Color.primary,
                textAlign : "center",
                fontWeight: "bold",
                fontFamily: Font["poppins-bold"],
            }}> Get started with {"\n"} Erisha AgroTrack</Text>
        </View>
        <View style = {{
            paddingHorizontal : Spacing * 2,
            paddingTop : Spacing * 7,
            flexDirection: "column", // added flexDirection style
            alignItems: "center", // added alignItems style to center the elements vertically
        }}>
            <TouchableOpacity 
            onPress = {() => navigation.navigate("Login")}
            style = {{
                backgroundColor : Color.primary,
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
            }}>
                <Text 
                    style= {{
                        color : Color.onPrimary,
                        fontSize : FontSize.large,
                        textAlign : "center",
                        fontWeight : "bold",
                        fontFamily: Font["poppins-bold"], 
                    }}
                >LogIn</Text>
            </TouchableOpacity>
        </View>
        <View style = {{
            paddingHorizontal : Spacing * 2,
            paddingVertical : Spacing * 4,
            flexDirection: "column", // added flexDirection style
            alignItems: "center", // added alignItems style to center the elements vertically
        }}>
            <TouchableOpacity 
            onPress = {() => navigation.navigate("Register")}
            style = {{
                paddingVertical : Spacing * 1.5,
                paddingHorizontal : Spacing * 2,
                width : "48%",
                borderRadius : Spacing
            }}>
                <Text style= {{
                    color : Color.text,
                    fontSize : FontSize.large,
                    textAlign : "center",
                    fontWeight : "bold",
                    fontFamily: Font["poppins-bold"], 
                }}>
                    Register
                </Text>

            </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
    );
};

export default Auth;

const styles = StyleSheet.create({});