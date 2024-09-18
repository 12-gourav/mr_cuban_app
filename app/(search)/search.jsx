import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import img from "../../assets/img/login.jpg";
import { BlurView } from "expo-blur";
import img2 from "../../assets/img/car3.png";
import star from "../../assets/img/star.png";
import { colors } from "../../assets/color";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import drivers from "../../constants/Driver";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const search = () => {
  const { pickup, drop, date, dropDate, taxi, way, returnPickup, returnDrop } =
    useLocalSearchParams();
  const [more, setMore] = useState(false);

  console.log(date, "date", dropDate, "drop");

  return (
    <ImageBackground
      source={img}
      style={{ flex: 1, justifyContent: "center" }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
        <View style={styles.topWrap}>
          <View style={styles.top}>
            <View style={styles.line}>
              <View style={styles.circle}></View>
              <View style={styles.wrap}>
                <Text style={styles.sm}>Pickup Location</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.p}>
                  {pickup}
                </Text>
              </View>
            </View>
            <View style={styles.line}>
              <View style={styles.circle}></View>
              <View style={styles.wrap}>
                <Text style={styles.sm}>Drop Location</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.p}>
                  {" "}
                  {drop}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => setMore(!more)}>
              <Text style={styles.more}>
                {more ? (
                  <Text>
                    Less Details
                    <AntDesign name="down" size={12} color="white" />
                  </Text>
                ) : (
                  <Text>
                    More Details <AntDesign name="up" size={12} color="white" />
                  </Text>
                )}
              </Text>
            </TouchableOpacity>

            {more && (
              <>
                <View style={styles.line}>
                  <View style={styles.circle}></View>
                  <View style={styles.wrap}>
                    <Text style={styles.sm}>Pickup Date & Time</Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.p}
                    >
                      {new Date(date).toLocaleString()}
                    </Text>
                  </View>
                </View>
                {way === "b" && (
                  <>
                    <View style={styles.line}>
                      <View style={styles.circle}></View>
                      <View style={styles.wrap}>
                        <Text style={styles.sm}>Return Pickup Address</Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={styles.p}
                        >
                          {" "}
                          {returnPickup}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.line}>
                      <View style={styles.circle}></View>
                      <View style={styles.wrap}>
                        <Text style={styles.sm}>Return Drop Address</Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={styles.p}
                        >
                          {" "}
                          {returnDrop}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.line}>
                      <View style={styles.circle}></View>
                      <View style={styles.wrap}>
                        <Text style={styles.sm}>Return Date & Time</Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={styles.p}
                        >
                          {new Date(date).toLocaleString()}
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ width: "100%", padding: 20, paddingBottom: 10 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 25,
              fontWeight: 600,
              fontFamily: "regular",
            }}
          >
            List of Rides
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: 400,
              fontFamily: "regular",
              marginTop: 10,
            }}
          >
            Select your ride and negotiate with the driver for the best fare.
          </Text>
        </View>

        <View style={styles.flat}>
          <FlatList
            data={drivers}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/detail",
                    params: {
                      name: item?.driver,
                      rating: item?.rating,
                      order: item?.orders,
                      price: item?.price,
                      pickup:pickup,
                      drop:drop,
                      way:way,
                      returnPickup:returnPickup,
                      returnDrop:returnDrop,
                    dropDate:dropDate,
                    pickupDate:date,
                    modelName:item?.modelName
                    },
                  })
                }
              >
                <BlurView
                  intensity={70}
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginBottom: 20,
                    overflow: "hidden",
                  }}
                  key={item?.price + index}
                >
                  <View
                    style={{ display: "flex", flexDirection: "row", gap: 20 }}
                  >
                    <View style={styles.left}>
                      <Image
                        resizeMode="contain"
                        style={{ width: 100 }}
                        source={img2}
                      />
                      <View
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          {item.rating}{" "}
                          <Image
                            source={star}
                            resizeMode="contain"
                            style={{ width: 15, height: 15 }}
                          />{" "}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          {item.orders}{" "}
                          <Text style={{ color: colors.green }}>Orders</Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.h2}>{item.driver}</Text>
                      <Text style={styles.p4}>
                        <Text>
                          Model Name:{" "}
                          <Text style={{ color: "white" }}>
                            {item.modelName}
                          </Text>
                        </Text>
                      </Text>
                      <Text style={styles.p3}> ₹{item.price}</Text>
                    </View>
                  </View>
                  <View style={styles.inputset}>
                    <View style={styles.pin}>
                      <FontAwesome name="map-pin" size={24} color="white" />
                    </View>
                    <View style={styles.line2}></View>
                    <Text style={styles.ov}>45KM</Text>
                    <View style={styles.line2}></View>
                    <View style={styles.pin}>
                      <FontAwesome5
                        name="map-marker-alt"
                        size={24}
                        color="white"
                      />
                    </View>
                  </View>
                </BlurView>
              </TouchableOpacity>
            )}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* </ScrollView> */}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default search;

const styles = StyleSheet.create({
  topWrap: {
    width: "100%",
    padding: 10,
  },
  top: {
    width: "100%",
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    height: "fit-content",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
  },
  circle: {
    width: 10,
    height: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 50,
    marginTop: 3,
  },

  line: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    width: "100%",
    overflow: "hidden",
  },
  wrap: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  sm: {
    color: "gray",
    fontSize: 12,
    fontWeight: "regular",
  },
  p: {
    color: "#fff",
    fontSize: 14,
    overflow: "hidden",
    fontWeight: "regular",
    fontFamily: "regular",
  },
  flat: {
    flex: 1,
    padding: 20,
  },
  h2: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "bold",
    fontWeight: "bold",
    marginBottom: 2,
  },
  p3: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "bold",
    fontWeight: "bold",
  },
  p4: {
    color: colors.green,
    fontSize: 12,
    fontFamily: "bold",
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputset: {
    flexDirection: "row", // Align elements in a row
    alignItems: "center", // Align elements vertically center
    justifyContent: "space-between", // Space them evenly
    paddingHorizontal: 10,
  },
  pin: {
    color: colors.primary,
  },
  ov: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: colors.primary,
  },
  line2: {
    flex: 1, // Takes up available space between the labels
    borderBottomWidth: 1,
    borderColor: "#fff", // Line color
    borderStyle: "dashed",
    marginHorizontal: 10,
  },

  more: {
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
