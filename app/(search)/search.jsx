import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import img from "../../assets/img/login.jpg";
import { BlurView } from "expo-blur";
import img2 from "../../assets/img/car3.png";
import star from "../../assets/img/star.png";
import { colors } from "../../assets/color";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import drivers from "../../constants/Driver";


const search = () => {
  const { pickup, drop, date,dropDate, taxi } = useLocalSearchParams();



  console.log(date,"date",dropDate,"drop")



  return (
    <ImageBackground
      source={img}
      style={{ flex: 1, justifyContent: "center" }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
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
          <View style={styles.line}>
            <View style={styles.circle}></View>
            <View style={styles.wrap}>
              <Text style={styles.sm}>Date & Time</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.p}>
                {new Date(date).toLocaleString()}
              </Text>
            </View>
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
            renderItem={({ item,index }) => (
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
                key={item?.price+index}
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
                        <Text style={{ color: "white" }}>{item.modelName}</Text>
                      </Text>
                    </Text>
                    <Text style={styles.p3}> ₹{item.price}</Text>
                  </View>
                </View>
                <View style={styles.inputset}>
                  <TextInput
                    placeholder="Enter Amount"
                    style={styles.input}
                    placeholderTextColor="#fff"
                  />
                  <View style={styles.btn2}>
                    <Text style={{ color: "#fff" }}>Send</Text>
                  </View>
                </View>
              </BlurView>
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
  top: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 180,
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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    overflow: "hidden",
  },
  input: {
    width: "80%",
    padding: 5,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  btn2: {
    backgroundColor: "#E27E05",
    color: "#fff",
    padding: 9,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 0,
    textAlign: "center",
  },
});
