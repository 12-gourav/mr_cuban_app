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
import { BlurView } from "expo-blur";
import img2 from "../../assets/img/car3.png";
import star from "../../assets/img/star.png";
import { colors } from "../../assets/color";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import drivers from "../../constants/Driver";
import orders from "../../constants/Order";

const history = () => {
  const { pickup, drop, date, taxi } = useLocalSearchParams();

  const [state,setState] = useState("current");






  

  return (
    <ImageBackground
      source={img}
      style={{ flex: 1, justifyContent: "center" }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={{ width: "100%", padding: 20, paddingBottom: 10 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 25,
              fontWeight: "bold",
              fontFamily: "bold",
            }}
          >
            Order History
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
            View your order history and manage past rides.
          </Text>
        </View>

        <View style={styles.tab}>
          <TouchableOpacity style={state==="current" ? styles.active: styles.tab1} onPress={()=>setState("current")}>
            <Text style={styles.tab_p
            }>Current Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity style={state==="history" ? styles.active: styles.tab1} onPress={()=>setState("history")}>
            <Text style={styles.tab_p}>History Rides</Text>
          </TouchableOpacity>
        </View>
{
  state === "current" ?

        <View style={styles.flat}>
          <FlatList
            data={orders}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <BlurView
                intensity={90}
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
                  style={{ display: "flex", flexDirection: "row", gap: 10 }}
                >
                  <View style={styles.left}>
                    <View style={styles.line}>
                      <Text style={styles.h5}>Pickup Location</Text>
                      <Text
                        style={styles.h2}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item?.pickupAddress}
                      </Text>
                    </View>
                    <View style={styles.line}>
                      <Text style={styles.h5}>Drop Location</Text>
                      <Text
                        style={styles.h2}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item?.dropAddress}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.p3}> ₹{item.price}</Text>
                  </View>
                </View>
                <View style={styles.status}>
                  <Text style={styles.km}>{item?.distance}</Text>
                  <Text
                    style={item?.status === "complete" ? styles.g : styles.r}
                  >
                    {item?.status}
                  </Text>
                  <Text style={styles.km}>
                    {new Date(item?.date)?.toLocaleDateString()}
                  </Text>
                </View>
              </BlurView>
            )}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </View>:
        <View style={styles.flat}>
          <FlatList
            data={orders}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <BlurView
                intensity={90}
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
                  style={{ display: "flex", flexDirection: "row", gap: 10 }}
                >
                  <View style={styles.left}>
                    <View style={styles.line}>
                      <Text style={styles.h5}>Pickup Location </Text>
                      <Text
                        style={styles.h2}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item?.pickupAddress}
                      </Text>
                    </View>
                    <View style={styles.line}>
                      <Text style={styles.h5}>Drop Location</Text>
                      <Text
                        style={styles.h2}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item?.dropAddress}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.p3}> ₹{item.price}</Text>
                  </View>
                </View>
                <View style={styles.status}>
                  <Text style={styles.km}>{item?.distance}</Text>
                  <Text
                    style={item?.status === "complete" ? styles.g : styles.r}
                  >
                    {item?.status}
                  </Text>
                  <Text style={styles.km}>
                    {new Date(item?.date)?.toLocaleDateString()}
                  </Text>
                </View>
              </BlurView>
            )}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default history;

const styles = StyleSheet.create({
  line: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    alignItems: "flex-start",
    width: "100%",
    overflow: "hidden",
  },
  h5: {
    color: "#000",
    fontWeight: "bold",
    fontFamily: "bold",
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
    fontSize: 14,
    fontFamily: "regular",
    fontWeight: "regular",
    marginBottom: 2,
  },

  p3: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "bold",
    fontWeight: "bold",
    marginBottom: 5,
  },
  status: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  g: {
    color: colors.green,
    fontWeight: "bold",
    fontFamily: "bold",
    fontSize: 18,
    textTransform: "capitalize",
  },
  r: {
    color: "red",
    fontWeight: "bold",
    fontFamily: "bold",
    fontSize: 18,
    textTransform: "capitalize",
  },
  km: {
    color: "#fff",
    textAlign: "left",
    justifyContent: "flex-start",
  },
  left: {
    width: "80%",
  },
tab:{
 paddingLeft:20,
 marginTop:10,
  width:"100%",
  display:"flex",
  alignItems:"center",
  flexDirection:"row",
  gap:10
},
active:{
  backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
},
tab1:{
  backgroundColor: "rgba(0,0,0,0.8)",
    padding: 10,
    borderRadius: 5,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  
},tab_p:{
  color:"#fff",
  fontWeight:"regular",
  fontFamily:"regular"
}


});
