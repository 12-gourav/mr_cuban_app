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
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../assets/color";
import img from "../../assets/img/car3.png";
import img2 from "../../assets/img/login.jpg";
import AuthButton from "../../components/AuthButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateOrder,
  GetVicheles,
  SendPushNotification,
} from "../../api/order";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AutocompleteText from "../../components/AutocompleteText";
import { AddressSuggestions } from "../../api/here";
import { debounce } from "lodash";
import { vicheles } from "../../constants/Car";

const home = () => {
  const { user } = useSelector((state) => state.user);
  const { isOrder } = useSelector((state) => state.order);
  const { car } = useSelector((state) => state.car);

  const [date, setDate] = useState(new Date(1598051730000));
  const [dropDate, setDropDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [mode2, setMode2] = useState("date");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [returnPickup, setReturnPickup] = useState("");
  const [returnDrop, setReturnDrop] = useState("");
  const [taxi, setTaxi] = useState("");
  const [state, setState] = useState("One Way");
  const [loading, setLoading] = useState(false);
  const [km, setKm] = useState("");

  const [viceles, setVicheles] = useState([]);
  const [vloading, setVloading] = useState(false);

  const [pickupAutocomplete, setPickupAutocomplete] = useState(false);
  const [pickupSuggestion, setPickupSuggestion] = useState([]);

  const [dropAutocomplete, setDropAutocomplete] = useState(false);
  const [dropSuggestion, setDropSuggestion] = useState([]);

  const dispatch = useDispatch();

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

  const handleRide = async () => {
    try {
      if (pickup === "")
        return ToastAndroid.show(
          "Pickup address is required",
          ToastAndroid.SHORT
        );
      if (drop === "")
        return ToastAndroid.show(
          "Drop address is required",
          ToastAndroid.SHORT
        );
      if (km === "")
        return ToastAndroid.show(
          "One way distance is required",
          ToastAndroid.SHORT
        );
      if (taxi === "")
        return ToastAndroid.show("Car is required", ToastAndroid.SHORT);

      setLoading(true);
      const result = await CreateOrder(
        pickup,
        drop,
        returnPickup,
        returnDrop,
        date,
        dropDate,
        state,
        user?._id,
        user?.accountOtp,
        taxi,
        km
      );
      if (result?.data?.data) {
        await SendPushNotification(
          "New Ride Order Alert!",
          "A new ride order has been created. Please check the 'Request Ride' section in the MRCUBAN Partner App to accept the ride.",
          taxi
        );
        dispatch({ type: "createOrder", payload: true });
        ToastAndroid.show("Ride Request Creat🚗ed ", ToastAndroid.SHORT);
        await AsyncStorage.setItem("orderId", result?.data?.data?._id);
        router.push({
          pathname: "/search",
        });
      } else {
        ToastAndroid.show(
          "Something went wrong. Order can not be create at this moment",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetcRides = async () => {
    try {
      setVloading(true);
      const result = await GetVicheles();
      if (result?.data?.data) {
        dispatch({ type: "addCar", payload: result?.data?.data });
        setVicheles(result?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setVloading(false);
    }
  };

  const handleOutsidePress = () => {
    setPickupAutocomplete(false); 
    setDropAutocomplete(false)
    Keyboard.dismiss(); 
  }

  const debouncedGetAddressSuggestion = debounce(async () => {
    try {
      if(pickup==="") return
      const result = await AddressSuggestions(pickup, "pickupAddress");
      setPickupSuggestion([]);
      if (result?.data?.items) {
        setPickupSuggestion(result?.data?.items);
      }
    } catch (error) {
      console.log(error);
    }
  }, 2000);


  const debouncedGetAddressSuggestion2 = debounce(async () => {
    try {
      if(drop==="") return
      const result = await AddressSuggestions(drop, "dropAddress");
      setDropSuggestion([]);
      if (result?.data?.items) {
        setDropSuggestion(result?.data?.items);
      }
    } catch (error) {
      console.log(error);
    }
  }, 2000);

  useEffect(() => {
    if (pickupAutocomplete) debouncedGetAddressSuggestion();

    return () => {
      debouncedGetAddressSuggestion.cancel();
    };
  }, [pickup, pickupAutocomplete]);

  useEffect(() => {
    if (dropAutocomplete) debouncedGetAddressSuggestion2();

    return () => {
      debouncedGetAddressSuggestion2.cancel();
    };
  }, [drop, dropAutocomplete]);

  useEffect(() => {
    if (car?.length === 0) fetcRides();
  }, [car]);

  useEffect(() => {
    if (isOrder) {
      router.push("/search");
    }
  }, [isOrder]);

  useEffect(() => {
    const newTimestamp = Date.now();
    setDate(new Date(newTimestamp));
    setDropDate(new Date(newTimestamp));
  }, []);

  return (
    <ImageBackground
      source={img2}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
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

            <View>
              <View style={styles.tabs}>
                <TouchableOpacity
                  onPress={() => setState("One Way")}
                  style={state === "One Way" ? styles.active : styles.tab1}
                >
                  <Text style={styles.tab_p}>One Way Trip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setState("Round Trip")}
                  style={state === "Round Trip" ? styles.active : styles.tab1}
                >
                  <Text style={styles.tab_p}>Round Trip</Text>
                </TouchableOpacity>
              </View>

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

              {state === "Round Trip" && (
                <View style={styles.wrapper}>
                  <View style={styles.groupz}>
                    <Text style={styles.label}>Return Date</Text>
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
                    <Text style={styles.label}>Return Time</Text>
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
           
              <View
                style={styles.group}
                onAccessibilityTap={() => setPickupAutocomplete(false)}
              >
                <Text style={styles.label}>Pickup Address</Text>
                <TextInput
                  value={pickup}
                  style={styles.input}
                  placeholder="Enter Pickup Address"
                  placeholderTextColor={"gray"}
                  onChangeText={(e) => setPickup(e)}
                  onFocus={() => setPickupAutocomplete(true)}
                />
                {pickupAutocomplete && pickupSuggestion?.length > 0 && (
                  <View style={styles.autocomplete}>
                    {pickupSuggestion?.map((d1, i) => (
                      <AutocompleteText
                        key={d1?.address?.label + i}
                        d={d1?.address?.label}
                        setPickup={setPickup}
                        setPickupAutocomplete={setPickupAutocomplete}
                      />
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
                value={drop}
                onFocus={() => setDropAutocomplete(true)}
              />
              {dropAutocomplete && dropSuggestion?.length > 0 && (
                <View style={styles.autocomplete}>
                  {dropSuggestion?.map((d1, i) => (
                    <AutocompleteText
                      key={d1?.address?.label + i}
                      d={d1?.address?.label}
                      setPickup={setDrop}
                      setPickupAutocomplete={setDropAutocomplete}
                    />
                  ))}
                </View>
              )}
            </View>

            {/* {state === "Round Trip" && (
              <>
                <View style={styles.group}>
                  <Text style={styles.label}>Return Pickup Address</Text>
                  <TextInput
                    value={returnPickup}
                    style={styles.input}
                    placeholder="Enter  Return Pickup Address"
                    placeholderTextColor={"gray"}
                    onChangeText={(e) => setReturnPickup(e)}
                  />
                </View>
                <View style={styles.group}>
                  <Text style={styles.label}>Return Drop Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter  Return Drop Address"
                    placeholderTextColor={"gray"}
                    onChangeText={(e) => setReturnDrop(e)}
                    value={returnDrop}
                  />
                </View>
              </>
            )} */}

            <View style={styles.group}>
              <Text style={styles.label}>One Way Distance (Aprox)</Text>
              <TextInput
                value={km}
                style={styles.input}
                placeholder="Enter Distance"
                placeholderTextColor={"gray"}
                onChangeText={(e) => setKm(e)}
              />
            </View>

            <View style={styles.group}>
              <Text style={styles.label}>Select Car</Text>
              {vloading ? (
                <View style={styles.slider}>
                  <FlatList
                    data={[1, 2, 3]}
                    renderItem={({ item, index }) => (
                      <View style={styles.card3} key={index}>
                        <ActivityIndicator size={"small"} color={"#fff"} />
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()} // Use index as a fallback
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 10 }} />
                    )}
                  />
                </View>
              ) : (
                <View style={styles.slider}>
                  <FlatList
                    data={car}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() => setTaxi(item.seat)}
                        key={index}
                      >
                        <View
                          style={
                            taxi === item?.seat ? styles.card2 : styles.card
                          }
                        >
                          <Image
                            style={{ width: 100,height:70,marginBottom:5}}
                            resizeMode="contain"
                            source={vicheles?.find((f)=>f?.name===item?.type)?.img||""}
                          />
                          <Text
                            style={
                              taxi === item?.seat ? styles.name2 : styles.name
                            }
                          >
                            {" "}
                            {item?.name} 
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()} // Use index as a fallback
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 10 }} />
                    )}
                  />
                </View>
              )}
            </View>

            <AuthButton
              loading={loading}
              title={"Book  Ride"}
              handlePress={() => handleRide()}
            />
          </View>
          </TouchableWithoutFeedback>
          <StatusBar backgroundColor="#000" style="light" />
        </ScrollView>
      </SafeAreaView>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          onChange={onChange}
        />
      )}
      {show2 && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dropDate}
          mode={mode2}
          is24Hour={false}
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
  card3: {
    backgroundColor: "rgba(0,0,0,0.8)",
    width: 200,
    height: 100,
    borderRadius: 5,
    padding: 10,
    color: "#fff",
    alignItems: "center",
    borderWidth: 2,
    justifyContent: "center",
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
    gap: 20,
    marginBottom: 10,
  },
  groupz: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 25,
    position: "relative",
    flex: 1,
  },
  tabs: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
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
