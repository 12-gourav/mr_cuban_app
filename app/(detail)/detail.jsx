import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import img from "../../assets/img/login.jpg";
import { colors } from "../../assets/color";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthButton from "../../components/AuthButton";
import { router, useLocalSearchParams } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useDispatch, useSelector } from "react-redux";
import { AcceptOrderAPI } from "../../api/order";
import { StatusBar } from "expo-status-bar";

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
    modelNumber,
    order_id,
    driver_id,
    image,
    km,
  } = useLocalSearchParams();

  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const CreateOrder = async () => {
    try {
      setLoading(true);
      const result = await AcceptOrderAPI(
        order_id,
        driver_id,
        user?._id,
        user?._name
      );

      if (result?.data?.data) {
        ToastAndroid.show(
          "Your ride has been successfully booked. Thank you for choosing Mr. Cuban for your travel needs.",
          ToastAndroid.SHORT
        );
        dispatch({ type: "deleteOrder", payload: false });
        router.replace("/history");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(JSON.parse(image));

  useEffect(() => {
    if (image) {
      setImages(JSON.parse(image));
    }
  }, [image]);

  console.log(images, "kkk");

  return (
    <ImageBackground
      source={img}
      style={{ flex: 1, justifyContent: "center" }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back-circle"
              size={34}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.door}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          >
            <View style={styles.wrap}>
              <Text style={styles.text}>Confirmation Order</Text>
              <View style={styles.otp}>
                <Text style={styles.otptext}>
                  {String(user?.accountOtp)[0]}
                </Text>
                <Text style={styles.otptext}>
                  {String(user?.accountOtp)[1]}
                </Text>
                <Text style={styles.otptext}>
                  {String(user?.accountOtp)[2]}
                </Text>
                <Text style={styles.otptext}>
                  {String(user?.accountOtp)[3]}
                </Text>
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
              <Text style={styles.label}>Model Number</Text>
              <Text style={styles.text1}>{modelNumber}</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Round Trip</Text>
              <Text style={styles.text1}>
                {way === "Round Trip" ? "Yes" : "No"}
              </Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Total Price</Text>
              <Text style={styles.text1}>₹{price}</Text>
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
              <Text style={styles.text2}>{pickupDate}</Text>
            </View>
            {way === "Round Trip" && (
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
                  <Text style={styles.text2}>{dropDate}</Text>
                </View>
              </>
            )}
            <View style={styles.form}>
              <Text style={styles.label}>One Way Distance (Aprox)</Text>
              <Text style={styles.text1}>{km} KM</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Car Images</Text>
              <View style={styles.images}>
                {images?.map((s) => (
                  <Image
                    resizeMode="cover"
                    source={{ uri: s?.url }}
                    key={s?.public_id}
                    style={styles.img}
                  />
                ))}
              </View>
            </View>
            <View style={styles.list}>
              <Text style={styles.list_head}>Additional Charges:</Text>
              <View style={styles.item}>
                <Text style={styles.title}>
                  Toll Costs, Parking, Permits, and State Taxes:
                </Text>
                <Text style={styles.description}>
                  Excluded from the ride fare.
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.title}>Extra Hours:</Text>
                <Text style={styles.description}>
                  ₹100 per hour for additional hours beyond the booking period.
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.title}>Extra Kilometers:</Text>
                <Text style={styles.description}>
                  ₹10 per kilometer for distance exceeding the booked limit.
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.title}>Night Allowance:</Text>
                <Text style={styles.description}>
                  ₹500 per night for rides between 11:00 PM and 6:00 AM.
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.title}>Additional Fare:</Text>
                <Text style={styles.description}>
                  May apply if the trip does not end within the designated
                  region (Rest of India).
                </Text>
              </View>
            </View>
            <AuthButton
              title={"Confirm Order"}
              loading={loading}
              handlePress={CreateOrder}
            />
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                color: "#ccc",
                textAlign: "justify",
                lineHeight: 20,
                marginBottom: 20,
              }}
            >
              Your ride is confirmed! Please share this OTP with the driver when
              they arrive to begin your ride: {user?.accountOtp}. For your
              safety, do not share the OTP until the driver is with you.
            </Text>
          </ScrollView>
        </View>
        <StatusBar backgroundColor="#000" style="light" />
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
    bottom: 0,
    height: "90%",
    top: "10%",
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
    textTransform: "capitalize",
  },
  text2: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
  },
  back: {
    color: "#fff",
    marginTop: 20,
    marginLeft: 20,
  },
  images: {
    width: "100%",
    display: "flex",
    gap: 10,
    flexDirection: "row",
    marginTop: 10,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  list:{
    marginTop:10,
   
  },
  list_head:{
    color:"#fff",
    fontSize:16,
    marginBottom:10
  },
  item:{
    width:"100%",
    display:"flex",
    flexDirection:"column",
    marginBottom:10
  },
  title:{
    color:colors.primary,
    fontSize:14
  },
  description:{
    color:"#fff",
    fontSize:13,
    marginTop:3
  }
});
