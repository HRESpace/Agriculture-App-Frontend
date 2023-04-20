import { StyleSheet, Text, View } from "react-native";
import Form from "./screens/Form";
import History from "./screens/History";
import Auth from "./screens/Auth";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Register from "./screens/Register";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {firebase} from "./Config";

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(true);

  //Handle user state changes
  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);
  
  if (initializing) return null;

  if(!user)
  {
    return (
    <Stack.Navigator>
      <Stack.Screen name="User Authentication" component={Auth} />
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={Register}/>
    </Stack.Navigator>
    );
  }
  return (
      <Stack.Navigator>
        <Stack.Screen name="Dashboard"  component={Dashboard}/>
        <Stack.Screen name="EERISHA AGRITECH" component={Form} />
        <Stack.Screen name="Details" component={History} />
      </Stack.Navigator>
  );
}

export default () => {
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
