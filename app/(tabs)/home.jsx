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
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../assets/color";
import img from "../../assets/img/car3.png";
import img2 from "../../assets/img/login.jpg";
import { car } from "../../constants/Car";
import AuthButton from "../../components/AuthButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import { addAddress } from "../../helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const home = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [dropDate, setDropDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [mode2, setMode2] = useState("date");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [pickup, setPickup] = useState("Near Boby Guest House lalganj");
  const [drop, setDrop] = useState("Mohanlalganh");
  const [taxi, setTaxi] = useState("");
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [pickupAddressList, setPickupaddressList] = useState([]);
  const [dropAddressList, setDropAddressList] = useState([]);
  const [state, setState] = useState("a");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow2(false);
    setDropDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showDatepicker2 = () => {
    showMode2("date");
  };

  const showTimepicker2 = () => {
    showMode2("time");
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleRide = () => {
    if (pickup === "")
      return ToastAndroid.show(
        "Pickup address is required",
        ToastAndroid.SHORT
      );
    if (drop === "")
      return ToastAndroid.show("Drop address is required", ToastAndroid.SHORT);
    if (taxi === "")
      return ToastAndroid.show("Car is required", ToastAndroid.SHORT);
    addAddress("pickup", pickup);
    addAddress("drop", drop);
    router.push({
      pathname: "/search",
      params: {
        pickup: pickup,
        drop: drop,
        date: date,
        dropDate:dropDate,
        taxi: taxi,
        way:state
      },
    });
  };

  const fetchAddressLists = async () => {
    try {
      // Fetch pickup addresses
      let data1 = await AsyncStorage.getItem("pickup");
      setPickupaddressList(data1 ? JSON.parse(data1) : []);

      // Fetch drop addresses
      let data2 = await AsyncStorage.getItem("drop");
      setDropAddressList(data2 ? JSON.parse(data2) : []);
    } catch (error) {
      console.error("Error fetching address lists:", error.message);
    }
  };

  useEffect(() => {
    fetchAddressLists();
  }, []);



  

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
                value={pickup}
                style={styles.input}
                placeholder="Enter Pickup Address"
                placeholderTextColor={"gray"}
                onChangeText={(e) => setPickup(e)}
                onFocus={() => setFlag(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setFlag(false);
                  }, 700)
                }
              />
              {pickupAddressList?.length > 0 &&
                flag &&
                pickupAddressList?.filter((f) => f?.includes(pickup))?.length >
                  0 && (
                  <View style={styles.autocomplete}>
                    {pickupAddressList
                      ?.filter((f) => f?.includes(pickup))
                      ?.map((d) => (
                        <View key={d}>
                          <TouchableOpacity
                            style={styles.auto_card}
                            onPress={() => {
                              setPickup(d);
                              setFlag(false);
                            }}
                          >
                            <View style={styles.tg}>
                              <FontAwesome
                                name="history"
                                size={14}
                                color="#fff"
                                style={{ marginRight: 5 }}
                              />
                              <Text style={{ color: "#fff" }}>{d}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))}
                  </View>
                )}
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>Drop Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Drop Address"
                placeholderTextColor={"gray"}
                onChangeText={(e) => setDrop(e)}
                onFocus={() => setFlag2(true)}
                value={drop}
                onBlur={() =>
                  setTimeout(() => {
                    setFlag2(false);
                  }, 700)
                }
              />
              {dropAddressList?.length > 0 &&
                flag2 &&
                dropAddressList?.filter((f) => f?.includes(drop))?.length >
                  0 && (
                  <View style={styles.autocomplete}>
                    {dropAddressList
                      ?.filter((f) => f?.includes(drop))
                      ?.map((d) => (
                        <View key={d}>
                          <TouchableOpacity
                            style={styles.auto_card}
                            onPress={() => {
                              setDrop(d);
                              setFlag2(false);
                              setFlag(false);
                            }}
                          >
                            <View style={styles.tg}>
                              <FontAwesome
                                name="history"
                                size={14}
                                color="#fff"
                                style={{ marginRight: 5 }}
                              />
                              <Text style={{ color: "#fff" }}>{d}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))}
                  </View>
                )}
            </View>

            <View>
              <View style={styles.tabs}>
                <TouchableOpacity
                  onPress={() => setState("a")}
                  style={state === "a" ? styles.active : styles.tab1}
                >
                  <Text style={styles.tab_p}>One Way Trip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setState("b")}
                  style={state === "b" ? styles.active : styles.tab1}
                >
                  <Text style={styles.tab_p}>Round Trip</Text>
                </TouchableOpacity>
              </View>
              {state === "a" ? (
                <View style={styles.wrapper}>
                  <View style={styles.groupz}>
                    <Text style={styles.label}>Pickup Date</Text>
                    <TouchableOpacity
                      style={styles.inputBtn}
                      onPress={showDatepicker}
                    >
                      <Text style={{ color: "gray" }}>
                        {date === new Date(1598051730000) ? (
                          "Select Pickup Date"
                        ) : (
                          <Text style={{ color: "#fff" }}>
                            {date?.toLocaleDateString()}
                          </Text>
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.groupz}>
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
                </View>
              ) : (
                <View style={styles.wrapper}>
                <View style={styles.groupz}>
                  <Text style={styles.label}>Drop Date</Text>
                  <TouchableOpacity
                    style={styles.inputBtn}
                    onPress={showDatepicker2}
                  >
                    <Text style={{ color: "gray" }}>
                      {dropDate === new Date(1598051730000) ? (
                        "Select Pickup Date"
                      ) : (
                        <Text style={{ color: "#fff" }}>
                          {dropDate?.toLocaleDateString()}
                        </Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.groupz}>
                  <Text style={styles.label}>Drop Time</Text>
                  <TouchableOpacity
                    style={styles.inputBtn}
                    onPress={showTimepicker2}
                  >
                    <Text style={{ color: "gray" }}>
                      {dropDate === 1598051730000 ? (
                        "Select Pickup Time"
                      ) : (
                        <Text style={{ color: "#fff" }}>
                          {dropDate?.toLocaleTimeString()}
                        </Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              )}
            </View>

            <View style={styles.group}>
              <Text style={styles.label}>Select Car</Text>
              <View style={styles.slider}>
                <FlatList
                  data={car}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => setTaxi(item.model)}
                      key={item?.model}
                    >
                      <View
                        style={
                          taxi === item?.model ? styles.card2 : styles.card
                        }
                      >
                        <Image
                          style={{ width: 100, marginBottom: 5 }}
                          resizeMode="contain"
                          source={img}
                        />
                        <Text
                          style={
                            taxi === item?.model ? styles.name2 : styles.name
                          }
                        >
                          {" "}
                          {item?.model}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item?.model}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                />
              </View>
            </View>
            <AuthButton title={"Book  Ride"} handlePress={() => handleRide()} />
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
       {show2 && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dropDate}
          mode={mode2}
          is24Hour={true}
          onChange={onChange2}
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
    position: "relative",
  },
  autocomplete: {
    position: "absolute",
    width: "100%",
    height: "fit-content",
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 999,
    top: 75,
    borderRadius: 5,
    padding: 10,
  },
  auto_card: {
    width: "100%",
    padding: 10,
  },
  tg: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
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
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 200,
    borderRadius: 5,
    padding: 10,
    color: "#fff",
    alignItems: "center",
    borderWidth: 2,
  },
  card2: {
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 200,
    borderRadius: 5,
    padding: 10,
    color: "#fff",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  dis: {
    color: "#fff",
  },

  name: {
    width: "100%",
    color: colors.primary,
    fontWeight: "bold",
    fontFamily: "bold",
  },
  name2: {
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
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom:10
  },
  groupz: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 25,
    position: "relative",
    width: "50%",
  },
  tabs: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  active: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tab1: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 10,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tab_p: {
    color: "#fff",
    fontWeight: "regular",
    fontFamily: "regular",
  },
});
