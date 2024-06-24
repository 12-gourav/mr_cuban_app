import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../assets/color";
import img from "../../assets/img/car3.png";
import { BlurView } from "expo-blur";
import AuthButton from "../../components/AuthButton";
import { router } from "expo-router";

const home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={styles.wrap}>
          <TouchableOpacity onPress={()=>router.push("/")}>
          <Text style={styles.h2} >

MR <Text style={{ color: colors.green }}>CUBAN</Text>
</Text>
          </TouchableOpacity>
        

          <View style={styles.group}>
            <Text style={styles.label}>Pickup Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Pickup Address"
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>Drop Address</Text>
            <TextInput style={styles.input} placeholder="Enter Drop Address" />
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>Pickup Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Pickup Date 12/04/2024"
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>Select Car</Text>
            <View style={styles.slider}>
              <FlatList
              
                data={[1,2,3,4,5,6]}
                renderItem={({ item }) => (
                  <BlurView style={styles.card}>
                    <Image
                      style={{ width: 100, marginBottom:5 }}
                      resizeMode="contain"
                      source={img}
                    />
                    <Text style={styles.head}>Brezza</Text>
                    <View style={styles.price}>
                      <Text style={styles.p}>7 Seater</Text>
                      <Text style={styles.p}>254 Rs/KM</Text>
                    </View>
                  </BlurView>
                )}
                keyExtractor={(item) => item}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
         <AuthButton title={"Book a Ride"} handlePress={()=>router.push("/search")}/>
        </View>
       
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  wrap: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  h2: {
    color: colors.primary,
    textAlign: "center",
    fontFamily: "regular",
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 30,
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 25,
  },
  label: {
    color: "#fff",
    fontFamily: "regular",
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#111111",
    borderRadius: 5,
    color: "#fff",
    outlineStyle: "none",
  },
  slider: {
    width: "100%",
    marginTop:10
  },
  card: {
    minWidth:180,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginRight:10
  },
  price: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  p: {
    color: "#fff",
    fontFamily: "regular",
    fontSize: 12,
    width: "fit-content",
    fontWeight: 500,
  },
  head:{
    color:"#E27E05",
    fontWeight:600,
    fontFamily:"regular",
    marginBottom:10,
    marginTop:5,
    width:"100%"
  },
  btn:{
    marginTop:10,
    backgroundColor:"#E27E05",
    padding:10,
    borderRadius:5,
  color:"#fff"
  }
});
