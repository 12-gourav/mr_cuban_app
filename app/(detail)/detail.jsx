import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import img from "../../assets/img/login.jpg";
import { colors } from "../../assets/color";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthButton from "../../components/AuthButton";
import { router, useLocalSearchParams } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";

const detail = () => {
  const {
    name,
    rating,
    order,
    price,
    pickup,
    drop,
    way,
    returnPickup,
    returnDrop,
    dropDate,
    pickupDate,
    modelName,
  } = useLocalSearchParams();

  const [loading,setLoading] = useState(false);


  const CreateOrder = async ()=>{
    try {


        
        
    } catch (error) {
        console.log(error)
    }
  }
















  return (
    <ImageBackground
      source={img}
      style={{ flex: 1, justifyContent: "center" }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
   
        <View style={styles.back}>
          <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons
              name="arrow-back-circle"
              size={34}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.door}>
        <ScrollView contentContainerStyle={{ flexGrow:1,paddingBottom:40}}>
            <View style={styles.wrap}>
              <Text style={styles.text}>Confirmation Order</Text>
              <View style={styles.otp}>
                <Text style={styles.otptext}>9</Text>
                <Text style={styles.otptext}>2</Text>
                <Text style={styles.otptext}>0</Text>
                <Text style={styles.otptext}>2</Text>
              </View>
            </View>
            <View style={styles.profile}>
              <View style={styles.icon}>
                <Text style={{ color: "#fff", fontWeight: 600, fontSize: 20 }}>
                  {name[0]}
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={{ color: "#fff", fontWeight: 600, fontSize: 20 }}>
                  {name}
                </Text>
                <View style={styles.rate}>
                  <Text style={styles.star}>
                    <Fontisto name="star" size={12} color={colors.primary} />{" "}
                    {rating}+
                  </Text>
                  <Text style={styles.order}>{order} Orders</Text>
                </View>
              </View>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Model Name</Text>
              <Text style={styles.text1}>{modelName}</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Round Trip</Text>
              <Text style={styles.text1}>{way === "b" ? "Yes" : "No"}</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Total Price</Text>
              <Text style={styles.text1}>₹
              {price}</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Pickup Location</Text>
              <Text style={styles.text1}>{pickup}</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Drop Location</Text>
              <Text style={styles.text1}>{drop}</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Pickup Time</Text>
              <Text style={styles.text1}>{pickupDate}</Text>
            </View>
            {way === "b" && (
              <>
                <View style={styles.form}>
                  <Text style={styles.label}>Return Pickup Location</Text>
                  <Text style={styles.text1}>{returnPickup}</Text>
                </View>

                <View style={styles.form}>
                  <Text style={styles.label}>Return Drop Location</Text>
                  <Text style={styles.text1}>{returnDrop}</Text>
                </View>

                <View style={styles.form}>
                  <Text style={styles.label}>Return Time</Text>
                  <Text style={styles.text1}>{dropDate}</Text>
                </View>
              </>
            )}
            <AuthButton title={"Confirm Order"} />
            </ScrollView>
        </View>
      
      </SafeAreaView>
    </ImageBackground>
  );
};

export default detail;

const styles = StyleSheet.create({
  door: {
    width: "100%",
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.9)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    bottom:0,
    height:"90%",
    top:"10%"
  },
  wrap: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 15,
  },
  otp: {
    display: "flex",
    width: 100,
    flexDirection: "row",
    gap: 5,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  otptext: {
    backgroundColor: colors.primary,
    color: "#fff",
    borderRadius: 5,
    paddingVertical: 10, // Equivalent to 1rem
    paddingHorizontal: 16,
  },
  profile: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 50,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
  },
  rate: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  star: {
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    color: "#fff",
  },
  order: {
    color: "#fff",
    fontSize: 16,
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginBottom: 10,
  },
  label: {
    color: "#ccc",
    fontSize: 14,
  },
  text1: {
    color: "#fff",
    fontSize: 16,
  },
  back:{
    color:"#fff",
    marginTop:20,
    marginLeft:20
  }
});