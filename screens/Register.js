import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import React from "react";
import Spacing from "../Constants/Spacing";
import FontSize from "../Constants/FontSize";
import Color from "../Constants/Color";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import {firebase} from "../Config";

async function loadFonts()
{
    await Font.loadAsync({
        'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'poppins-semiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });
}

const Register= () => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");

    const registerUser = async (email, password, confirmPassword, firstName, lastName) => {
        console.log("Confirm Password:", confirmPassword);
        console.log("Last Name:", lastName);
        if (password != confirmPassword) {
          alert("Password and confirm password fields doesn't match.");
          return;
        }
        await firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: "https://geo-tagged-ccff5.firebaseapp.com",
              }).then(() => {
                    alert("Verification link sent on the email.");
                }).catch((error) => {
                    alert(error.message);
                })
              .then(() => {
                firebase.firestore().collection("users")
                  .doc(firebase.auth().currentUser.uid)
                  .set({ firstName, lastName, email })
                  .then(() => {
                    alert("User registered successfully.");
                  })
                  .catch((error) => {
                    alert(error.message);
                  });
              });
          })
          .catch((error) => {
            alert(error.message);
          });
    };
    // define state variable to keep track of password visibility
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    // toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    }
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
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
                Create Account
            </Text>
            <Text style = {{
                fontFamily : Font["poppins-semiBold"],
                fontSize : FontSize.large,
                maxWidth : "60%",
                textAlign : "center",
            }}>Create your account to move further.</Text>
        </View>
            <View style = {{
                marginVertical : Spacing * 2,
            }}>
                <TextInput 
                placeholder = "First Name"
                placeholderTextColor = {Color.darkText} 
                style = {{
                    fontFamily : Font["poppins-regular"],
                    fontSize : FontSize.small,
                    padding : Spacing * 2,
                    backgroundColor : Color.lightPrimary,
                    borderRadius : Spacing,
                    marginVertical : Spacing,
                }}
                onChangeText = {(firstName) => setFirstName(firstName)}
                autoCorrect = {false} 
                />
                <TextInput 
                placeholder = "Last Name"
                placeholderTextColor = {Color.darkText} 
                style = {{
                    fontFamily : Font["poppins-regular"],
                    fontSize : FontSize.small,
                    padding : Spacing * 2,
                    backgroundColor : Color.lightPrimary,
                    borderRadius : Spacing,
                    marginVertical : Spacing,
                }}
                onChangeText = {(lastname) => setLastName(lastName)}
                autoCorrect = {false} 
                />
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor={Color.darkText}
                    //Conditionally set secureTextEntry prop.
                    secureTextEntry={!showConfirmPassword}
                    style={{
                        fontFamily: Font['poppins-regular'],
                        fontSize: FontSize.small,
                        padding: Spacing * 2,
                        backgroundColor: Color.lightPrimary,
                        borderRadius: Spacing,
                        marginVertical: Spacing,
                        flex: 1,
                    }}
                    // onChangeText = {(confirmPassword) => setConfirmPassword(confirmPassword)}
                    onChangeText = {(confirmPassword) => setConfirmPassword(confirmPassword)}
                    autoCapitalize = "none"
                    autoCorrect = {false} 
                    />
                    <Ionicons
                        name={showConfirmPassword ? 'eye-off' : 'eye'}
                        type="ionicon"
                        onPress={toggleConfirmPasswordVisibility}
                    />
                </View>
            </View>
        <View>
        </View>
        <View>
            <TouchableOpacity 
            onPress = {() => registerUser(
                email, password, confirmPassword, firstName, lastName
                )}
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
                }}>SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => navigation.navigate("Login")}
            style = {{
                padding : Spacing,
            }}>
                <Text style = {{
                    fontFamily : Font["poppins-semiBold"],
                    color : Color.text,
                    textAlign : "center",
                    fontWeight : "bold",
                    fontSize : FontSize.medium,
                }}>Already have an account</Text>
            </TouchableOpacity>
        </View>

    </View>
    </ScrollView>
);
};

export default Register;