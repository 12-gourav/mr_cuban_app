import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../assets/color";
import img from "../../assets/img/car3.png";
import img2 from "../../assets/img/login.jpg";
import {car} from "../../constants/Car"
import AuthButton from "../../components/AuthButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

const home = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <ImageBackground
      source={img2}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.wrap}>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.h2}>
                MR{" "}
                <Text
                  style={{
                    color: colors.green,
                    fontWeight: "bold",
                    fontFamily: "bold",
                  }}
                >
                  CUBAN
                </Text>
              </Text>
            </TouchableOpacity>

            <View style={styles.group}>
              <Text style={styles.label}>Pickup Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Pickup Address"
                placeholderTextColor={"gray"}
              />
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>Drop Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Drop Address"
                placeholderTextColor={"gray"}
              />
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>Pickup Date</Text>
              <TouchableOpacity
                style={styles.inputBtn}
                onPress={showDatepicker}
              >
                <Text style={{ color: "gray" }}>
                  {date === 1598051730000 ? (
                    "Select Pickup Date"
                  ) : (
                    <Text style={{ color: "#fff" }}>
                      {date?.toLocaleDateString()}
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>Pickup Time</Text>
              <TouchableOpacity
                style={styles.inputBtn}
                onPress={showTimepicker}
              >
                <Text style={{ color: "gray" }}>
                  {date === 1598051730000 ? (
                    "Select Pickup Time"
                  ) : (
                    <Text style={{ color: "#fff" }}>
                      {date?.toLocaleTimeString()}
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.group}>
              <Text style={styles.label}>Select Car</Text>
              <View style={styles.slider}>
                <FlatList
                  data={car}
                  renderItem={({ item }) => (
                    <View style={styles.card}>
                      <Image
                        style={{ width: 100, marginBottom: 5 }}
                        resizeMode="contain"
                        source={img}
                      />
                      <Text style={styles.name}> {item?.model}</Text>
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          flexDirection:"row"
                        }}
                      >
                        <Text style={styles.dis}>{item?.seat} Seater</Text>
                        <Text style={styles.dis}>{item?.price}</Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item) => item?.model}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                />
              </View>
            </View>
            <AuthButton
              title={"Book  Ride"}
              handlePress={() => router.push("/search")}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </ImageBackground>
  );
};

export default home;

const styles = StyleSheet.create({
  wrap: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  h2: {
    color: colors.primary,
    textAlign: "center",
    fontFamily: "bold",
    fontSize: 20,
    fontWeight: "bold",
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
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 5,
    color: "#fff",
    outlineStyle: "none",
  },
  inputBtn: {
    width: "100%",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 5,
    color: "#fff",
    outlineStyle: "none",
  },
  slider: {
    width: "100%",
    marginTop: 10,
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.8)",
    width: 200,
    borderRadius: 5,
    padding: 10,
    color: "#fff",
    alignItems: "center",
  },
  dis:{
    color:"#fff"
  },


  name: {
    width: "100%",
    color: colors.primary,
    fontWeight: "bold",
    fontFamily: "bold",
  },
  p: {
    color: "#fff",
    fontFamily: "regular",
    fontSize: 12,
    width: "fit-content",
    fontWeight: "regular",
  },
  head: {
    color: "#E27E05",
    fontWeight: "regular",
    fontFamily: "regular",
    marginBottom: 10,
    marginTop: 5,
    width: "100%",
  },
  btn: {
    marginTop: 10,
    backgroundColor: "#E27E05",
    padding: 10,
    borderRadius: 5,
    color: "#fff",
  },
});
