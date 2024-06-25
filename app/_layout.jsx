import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen,Stack } from "expo-router";
import {useFonts} from "expo-font"


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
const [fontsLoaded,error] = useFonts({
    "extra":require("../assets/fonts/Lato-Black.ttf"),
    "bold":require("../assets/fonts/Lato-Bold.ttf"),
    "regular":require("../assets/fonts/Lato-Regular.ttf"),
    "light":require("../assets/fonts/Lato-Light.ttf"),
    "thin":require("../assets/fonts/Lato-Thin.ttf")
})


//Mechanism of fonts loaded in expo app
useEffect(()=>{
if(error) throw error;
if(fontsLoaded) SplashScreen.hideAsync()
},[fontsLoaded,error]);


if(!fontsLoaded && !error) return null

  return (
    
    <Stack>
    <Stack.Screen name="index" options={{headerShown:false}}/>
    <Stack.Screen name="(auth)" options={{headerShown:false}}/>
    <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
    <Stack.Screen name="(search)/search" options={{headerShown:false}}/>
    </Stack>

    

  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flex: "1",
    justifyContent: "center",
  },
});
