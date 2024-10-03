import {
  Alert,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import img from "../../assets/img/login.jpg";
import { colors } from "../../assets/color";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthButton from "../../components/AuthButton";
import { router } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useDispatch, useSelector } from "react-redux";
import { CancelOrderAfterAPI } from "../../api/order";
import { StatusBar } from "expo-status-bar";
import RatingModal from "../../components/RatingModal";

const orderdetail = () => {
  const { user } = useSelector((state) => state.user);
  const { order } = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const CancelOrder = async () => {
    Alert.alert(
      "Cancel Ride", // Title of the alert
      "Are you sure you want to cancel this ride?", // Message
      [
        {
          text: "No",
          onPress: () => console.log("Ride cancellation aborted"), // If "No" is pressed
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              setLoading(true);
              const result = await CancelOrderAfterAPI(
                order?._id,
                order?.driverOrderId
              );
              if (result?.data?.data) {
                dispatch({ type: "deleteOrder", payload: false });
                ToastAndroid.show(
                  "Ride canceled successfully 🚗",
                  ToastAndroid.SHORT
                );
                router.push("/history");
              }
            } catch (error) {
              console.log(error);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <ImageBackground
      source={img}
      style={{ flex: 1, justifyContent: "center" }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
        <View style={styles.door}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          >
            <View style={styles.wrap}>
              <Text style={styles.text}>Ride Details</Text>
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
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 20,
                    textTransform: "capitalize",
                  }}
                >
                  {String(order?.driver[0]?.name)[0] || "G"}
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={{ color: "#fff", fontWeight: 600, fontSize: 20 }}>
                  {order?.driver[0]?.name}
                </Text>
                <View style={styles.rate}>
                  <Text style={styles.star}>
                    <Fontisto name="star" size={12} color={colors.primary} />{" "}
                    {order?.driver[0]?.rating || 0}+
                  </Text>
                  <Text style={styles.order}>
                    {order?.driver[0]?.orders || 0} Orders
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Model Name</Text>
              <Text style={styles.text1}>
                {order?.driver[0]?.model?.model || ""}
              </Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Vichele Number</Text>
              <Text style={styles.text1}>
                {order?.driver[0]?.model?.modelNumber || ""}
              </Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Round Trip</Text>
              <Text style={styles.text1}>
                {order?.type === "Round Trip" ? "Yes" : "No"}
              </Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Total Price</Text>
              <Text style={styles.text1}>₹{order?.price}</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Contact Number</Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`tel:${order?.driver[0]?.phone}`)
                }
              >
                <Text style={{ fontSize: 16, color: colors.primary }}>
                  {order?.driver[0]?.phone || "-"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Pickup Location</Text>
              <Text style={styles.text1}>{order?.distance1}</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Drop Location</Text>
              <Text style={styles.text1}>{order?.distance2}</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Pickup Time</Text>
              <Text style={styles.text1}>{order?.date1}</Text>
            </View>
            {order?.type === "Round Trip" && (
              <>
                <View style={styles.form}>
                  <Text style={styles.label}>Return Pickup Location</Text>
                  <Text style={styles.text1}>{order?.distance3}</Text>
                </View>

                <View style={styles.form}>
                  <Text style={styles.label}>Return Drop Location</Text>
                  <Text style={styles.text1}>{order?.distance4}</Text>
                </View>

                <View style={styles.form}>
                  <Text style={styles.label}>Return Time</Text>
                  <Text style={styles.text1}>{order?.date2}</Text>
                </View>
              </>
            )}

            {order?.status === "complete" ? (
              <AuthButton
                title={"Give Feedback"}
                handlePress={() => setModalVisible(true)}
              />
            ) : (
              <AuthButton
                title={order?.status === "cancel" ? "Canceled" : "Cancel Order"}
                loading={loading}
                handlePress={() => order?.status !== "cancel" && CancelOrder()}
              />
            )}

            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                color: "#ccc",
                textAlign: "justify",
                lineHeight: 20,
              }}
            >
              Your ride is confirmed! Please share this OTP with the driver when
              they arrive to begin your ride: {user?.accountOtp}. For your
              safety, do not share the OTP until the driver is with you.
            </Text>
          </ScrollView>

          {modalVisible && (
            <RatingModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              data={order}
              id={user?._id}
            />
          )}
        </View>

        <StatusBar backgroundColor="#000" style="light" />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default orderdetail;

const styles = StyleSheet.create({
  door: {
    width: "100%",
    display: "flex",
    padding: 20,
    bottom: 0,
    flex: 1,
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
  back: {
    color: "#fff",
    marginTop: 20,
    marginLeft: 20,
  },
});
