import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../assets/color";
import img from "../../assets/img/r5.png";
import { StatusBar } from "expo-status-bar";


const Offers = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.wrap}>
          <Text style={styles.title}>
            Discover <Text style={{ color: colors.primary }}>iOffer</Text>
          </Text>
          <Text style={styles.dis}>
            Explore our exclusive iOffer section to find unique deals and
            special packages tailored just for you. Whether you're looking for
            luxury upgrades, family-friendly options, or budget-friendly rides,
            iOffer has something to suit every journey. Unlock personalized
            offers and enhance your booking experience with added convenience
            and savings.
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
          }}
        >
          <Image
            source={img}
            resizeMode="cover"
            style={{ width: 300, height: 300,objectFit:"contain", backgroundColor: "#000" }}
          />
        </View>

      </ScrollView>
      <StatusBar backgroundColor="#000" style="light" />
    </SafeAreaView>
  );
};

export default Offers;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#000",
  
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "bold",
    fontWeight: "bold",
    color: "#fff",
  },
  dis: {
    fontWeight: "regular",
    color: "#fff",
    lineHeight: 20,
    textAlign: "justify",
    marginTop: 10,
  },
});
