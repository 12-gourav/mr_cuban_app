import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../assets/color";
import img from "../../assets/img/login.jpg";
import AuthButton from "../../components/AuthButton";
import {useSelector} from "react-redux";

const accout = () => {

  const {user} = useSelector((state)=>state.user)



  return (
    <ImageBackground
    source={img}
    style={{ flex: 1, justifyContent: "center" }}
    resizeMode="cover"
  >
   
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <Text style={styles.h2}>Profile Page</Text>
            <Text style={styles.p}>
              Welcome to your profile! Here, you can manage your account
              details, view your booking history, and update your preferences.
            </Text>
          </View>

          <Text style={styles.h4}>Personal Details</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholderTextColor={"#fff"} value={user?.name} placeholder="Enter Your Name" />
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholderTextColor={"#fff"} value={user?.email} placeholder="Enter Your Email" />
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholderTextColor={"#fff"} value={user?.password} placeholder="Enter Your Password" />
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={styles.input} placeholderTextColor={"#fff"} value={user?.phone} placeholder="Enter Your Phone Number" />
          </View> 
          <View style={{paddingLeft:20,paddingRight:20}}>
          <AuthButton title={"Update Profile"}  />
          </View>
      

        </ScrollView>
      </SafeAreaView>
    
    </ImageBackground>
  );
};

export default accout;

const styles = StyleSheet.create({
  header: {
    margin: 20,
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "bold",
    color: colors.primary,
    marginBottom: 5,
  },
  h4:{
    paddingLeft:20,
    color:"#fff",
    fontSize: 16,
    fontWeight: "regular",
    fontFamily: "regular",
    marginBottom:15
  },
  p: {
    color: "#fff",
    textAlign: "justify",
    fontSize: 14,
    fontWeight: "regular",
    fontFamily: "regular",
    lineHeight: 20,
  },
  form: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom:15
  },
  label: {
    fontSize: 16,
    fontWeight: "regular",
    fontFamily: "regular",
    color: "#fff",
    marginBottom:5
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 5,
    color: "#fff",
    outlineStyle: "none",
    marginTop:5

  },
});
