import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React from "react";
import {firebase} from '../Config';
import Spacing from "../Constants/Spacing";
import Color from "../Constants/Color";
import FontSize from "../Constants/FontSize";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";

async function loadFonts() {
    await Font.loadAsync({
      'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
      'poppins-semiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });
}


const Dashboard = () =>{
    const navigation = useNavigation();
    const [name,setName] = React.useState([]);

    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(() => {
            alert("Password reset mail sent.")
        }).catch((error) => {
            alert(error)
        })
    }

    React.useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                console.log(snapshot.data());
                setName(snapshot.data());
            } else {
                console.log("User does not exist.")
            }
        })
    }, [])
    return(
        <ScrollView>
            <View style = {{padding : Spacing * 2,}}>
                <View
                    style = {{
                    alignItems : "center",
                    }}>
                    <Text style = {{
                        fontSize : FontSize.xLarge,
                        color : Color.primary,
                        fontFamily : Font["poppins-bold"],
                        fontWeight : "bold", 
                        marginVertical : Spacing * 3,
                    }}> 
                        Hello 🤓,
                    </Text>
                    <Text style = {{
                        fontFamily : Font["poppins-semiBold"],
                        fontSize : FontSize.xlarge,
                        fontWeight : "bold",
                        maxWidth : "60%",
                    }}> {name.firstName}</Text>
                </View>
                <View style = {{
                    paddingHorizontal : Spacing * 2,
                    paddingTop : Spacing * 7,
                    flexDirection: "column", // added flexDirection style
                    alignItems: "center", // added alignItems style to center the elements vertically
                }}>
                    <TouchableOpacity 
                    onPress = {() => navigation.navigate("ERISHA AGRITECH")}
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
                        >Fill the data</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{
                    paddingHorizontal : Spacing * 2,
                    paddingVertical : Spacing * 4,
                    flexDirection: "column", // added flexDirection style
                    alignItems: "center", // added alignItems style to center the elements vertically
                }}>
                    <TouchableOpacity 
                    onPress = {() => navigation.navigate("Details")}
                    style = {{
                        paddingVertical : Spacing * 1.5,
                        paddingHorizontal : Spacing * 2,
                        backgroundColor : Color.lightPrimary,
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
                        <Text style= {{
                            color : Color.text,
                            fontSize : FontSize.large,
                            textAlign : "center",
                            fontWeight : "bold",
                            fontFamily: Font["poppins-bold"], 
                        }}>
                            See the Data Filled
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                    onPress = {() => {}}
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
                        }}>Check Email Verified</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                    onPress = {() => {changePassword()}}
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
                        }}>Change Password</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                    onPress = {() => {firebase.auth().signOut()}}
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
                        }}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Dashboard