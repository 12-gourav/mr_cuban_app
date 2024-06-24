import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
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

const search = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      
        <ImageBackground
          source={img}
          style={{ flex: 1, position: "relative", height: "100%" }}
          resizeMode="cover"
        />

        <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100%",
          }}
        >
          <BlurView
            intensity={30}
            style={{
              width: "100%",
              height: 150,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              padding: 10,
            }}
          >
            <View style={styles.tag}>
              <Text style={styles.p2}>Pickup Address:</Text>
              <Text style={styles.p1}>
                Near Boby Guest House Lalganj Raebraely 229206
              </Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.p2}>Drop Address:</Text>
              <Text style={styles.p1}>
                Ambalika Institute of technology Mohanlalganj,Lucknow...
              </Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.p2}>Pickup Time:</Text>
              <Text style={styles.p1}>12/04/2024 | 12:00 AM</Text>
            </View>
          </BlurView>
          <ScrollView contentContainerStyle={{height:400}}>
          <View style={styles.list}>
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

            <View style={styles.flat}>
              <FlatList
                data={[1,2,3,4,5]}
                renderItem={({ item }) => (
                  <BlurView
                    intensity={30}
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      padding: 20,
                      paddingLeft: 10,
                      paddingRight: 10,
                      display: "flex",
                      flexDirection: "row",
                      gap: 20,
                      marginBottom:20
                    }}
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
                          4.5
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
                          40+
                          <Text style={{ color: colors.green }}>Orders</Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.h2}>Gaurav Bajpai</Text>
                      <Text style={styles.p4}>
                        <Text>Model Name:</Text>Vitara Brezza
                      </Text>
                      <Text style={styles.p3}>2500Rs</Text>
                      <View style={styles.inputset}>
                        <TextInput
                          placeholder="Enter Amount"
                          style={styles.input}
                        />
                        <View style={styles.btn2}>
                          <Text style={{ color: "#fff" }}>Send</Text>
                        </View>
                      </View>
                    </View>
                  </BlurView>
                )}
                keyExtractor={(item) => item}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          </ScrollView>
          
        </View>

    </SafeAreaView>
  );
};

export default search;

const styles = StyleSheet.create({
  tag: {
    width: "100%",
    display: "flex",
    gap: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
  p1: {
    color: "#fff",
    fontFamily: "regular",
  },
  p2: {
    minWidth: 100,
    color: "#E27E05",
    fontWeight: 600,
    fontFamily: "regular",
  },
  list: {
    marginTop: 10,
    padding: 10,
    height:"100%"
  },
  flat: {
    marginTop: 20,
  },
  left: {
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  right: {
    width: "fit-content",
  },
  h2: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "regular",
    fontWeight: 600,
    marginBottom: 2,
  },
  p3: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "regular",
    fontWeight: 500,
  },
  p4: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "regular",
    fontWeight: 500,
    marginBottom: 5,
  },
  inputset: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  input: {
    width: 120,
    padding: 5,
    color: "#fff",
    marginTop: 5,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  btn2: {
    backgroundColor: "#E27E05",
    color: "#fff",
    width: "fit-content",
    padding: 5,
    marginTop: 5,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
});
