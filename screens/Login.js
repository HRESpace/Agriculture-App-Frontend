import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
  } from "react-native";
import {firebase} from "../Config";
import React from "react";
import Spacing from "../Constants/Spacing";
import FontSize from "../Constants/FontSize";
import Color from "../Constants/Color";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
  
async function loadFonts() {
    await Font.loadAsync({
      'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
      'poppins-semiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });
}
  
const Login = () => {
    const navigation = useNavigation();
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");

    const loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email,password);
        } catch (error){
            alert(error.message)
        }
    };

    // define state variable to keep track of password visibility
    const [showPassword, setShowPassword] = React.useState(false);
    // toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    }
return (
    <ScrollView>
    <View style = {{
        padding : Spacing * 2,
    }}>
        <View style = {{
            alignItems : "center",
        }}>
            <Text style = {{
                fontSize : FontSize.xLarge,
                color : Color.primary,
                fontFamily : Font["poppins-bold"],
                fontWeight : "bold", 
                marginVertical : Spacing * 3,
            }}> 
                LogIn here
            </Text>
            <Text style = {{
                fontFamily : Font["poppins-semiBold"],
                fontSize : FontSize.large,
                maxWidth : "60%",
            }}>Welcome Back. 😊</Text>
        </View>
        <View style = {{
            marginVertical : Spacing * 3,
        }}>
            <TextInput 
            placeholder = "Email"
            placeholderTextColor = {Color.darkText} 
            style = {{
                 fontFamily : Font["poppins-regular"],
                 fontSize : FontSize.small,
                 padding : Spacing * 2,
                 backgroundColor : Color.lightPrimary,
                 borderRadius : Spacing,
                 marginVertical : Spacing,
            }}
            onChangeText = {(email) => setEmail(email)}
            autoCapitalize = "none"
            autoCorrect = {false} 
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                placeholder="Password"
                placeholderTextColor={Color.darkText}
                //Conditionally set secureTextEntry prop.
                secureTextEntry={!showPassword}
                style={{
                    fontFamily: Font['poppins-regular'],
                    fontSize: FontSize.small,
                    padding: Spacing * 2,
                    backgroundColor: Color.lightPrimary,
                    borderRadius: Spacing,
                    marginVertical: Spacing,
                    flex: 1,
                }}
                onChangeText = {(password) => setPassword(password)}
                autoCapitalize = "none"
                autoCorrect = {false} 
                />
                <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    type="ionicon"
                    onPress={togglePasswordVisibility}
                />
            </View>
        </View>
        <View>
            <Text style = {{
                fontFamily : Font["poppins-semiBold"],
                fontSize : FontSize.small,
                color : Color.primary,
                alignSelf : "flex-end",
                fontWeight : "bold",
            }}>
                Forgot you password?
            </Text>
        </View>
        <View>
            <TouchableOpacity 
            onPress = {() => loginUser(email,password)}
            style = {{
                padding : Spacing * 2,
                backgroundColor : Color.primary,
                marginVertical : Spacing * 3,
                borderRadius : Spacing,
                shadowColor : Color.primary,
                shadowOffset : {
                    width : 0,
                    height : Spacing,
                },
                shadowOpacity : 0.5,
                shadowRadius : Spacing,
            }}>
                <Text style = {{
                    fontFamily : Font["poppins-semiBold"],
                    color : Color.onprimary,
                    textAlign : "center",
                    fontWeight : "bold",
                    fontSize : FontSize.large,
                }}>SignIn</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            // onPress={() => props.navigation.navigate("Details")}
            onPress = {() => navigation.navigate("Register")}
            style = {{
                padding : Spacing,
            }}>
                <Text style = {{
                    fontFamily : Font["poppins-semiBold"],
                    color : Color.text,
                    textAlign : "center",
                    fontWeight : "bold",
                    fontSize : FontSize.medium,
                }}>Create a new account</Text> 
            </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
);
};

export default Login;

const styles = StyleSheet.create({});