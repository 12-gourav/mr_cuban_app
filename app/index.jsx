import {  Image, ScrollView,  StyleSheet, Text,  View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../assets/color";
import img from "../assets/img/login.jpg";
import AuthButton from "../components/AuthButton";
import {router} from "expo-router";
import { StatusBar } from 'expo-status-bar'

const RooyLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Image
          source={img}
          style={{ flex: 1, position: "relative" }}
          resizeMode="cover"
        />
        <View style={styles.layer}>
          <Text style={styles.heading}>
            MR <Text style={{ color: colors.green }}>Cuban</Text>
          </Text>
          <Text style={styles.p}>
            Welcome to MR Cuban, your ultimate destination for seamless and
            stylish car bookings. Your ride, your way – just a tap away!
          </Text>
      <AuthButton title="Continue with Email" handlePress={()=>router.push("/sign-in")}/>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
};

export default RooyLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  heading: {
    fontWeight: "700",
    fontFamily: "regular",
    fontSize: "40px",
    color: colors.primary,
  },
  p:{
    color:"#fff",
    textAlign:"center",
    fontSize:14,
    fontFamily:"regular",
    lineHeight:22,
    marginTop:10
  }
});


