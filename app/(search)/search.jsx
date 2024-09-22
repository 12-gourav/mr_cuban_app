import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import img from "../../assets/img/login.jpg";
import { BlurView } from "expo-blur";
import img2 from "../../assets/img/car3.png";
import star from "../../assets/img/star.png";
import { colors } from "../../assets/color";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { CancelOrderAPI, GetRidesAPI, SearchOrders } from "../../api/order";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import AuthButton from "../../components/AuthButton";
import img3 from "../../assets/img/taxi_loader.gif";

const search = () => {
  const { isOrder } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [state, setState] = useState();
  const [rides, setRides] = useState([]);
  const [rideLoading, setRideLoading] = useState(false);
  const [total,setTotal] = useState(0)
  const router = useRouter();
  const dispatch = useDispatch();

  const SearchRides = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const result = await SearchOrders(user?._id, token);
      if (result?.data?.data) {
        setState(result?.data?.data);
        setRides(result?.data?.data?.drivers);
      } else {
        setState([]);
        setRides([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const CancelOrder = async () => {
    try {
      setLoading2(true);
      const id = state?._id;
      const result = await CancelOrderAPI(id);
      if (result?.data?.data) {
        dispatch({ type: "deleteOrder", payload: false });
        ToastAndroid.show("Ride Cancel successfully 🚗", ToastAndroid.SHORT);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
    }
  };

  const handleBackAction = () => {
    if (isOrder) {
      Alert.alert(
        "Cancel Order",
        "You must cancel your order before leaving the screen."
      );
      return true;
    }
    return false;
  };

  useEffect(() => {
    // Add the event listener for the back button press on Android
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackAction
    );

    // Cleanup the listener when the component unmounts
    return () => backHandler.remove();
  }, [isOrder]);

  const fetchRides = async () => {
    try {
      setRideLoading(true);
      const result = await GetRidesAPI(state?._id);
    
      if (result?.data?.data) {
        setRides(result?.data?.data?.drivers);

      }
    } catch (error) {
      console.log(error);
    } finally {
      setRideLoading(false);
    }
  };

  useEffect(() => {
    if (state?._id ) {
      const intervalId = setInterval(() => {
     
        fetchRides();
      },10000); // 5 seconds in milliseconds

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [state?._id]);

  useEffect(() => {
    if (isOrder) {
      SearchRides();
    }
  }, [isOrder]);



  return (
    <ImageBackground
      source={img}
      style={{ flex: 1, justifyContent: "center" }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        {loading ? (
          <View style={styles.loader}>
            <Text style={{ color: colors.primary, fontSize: 30 }}>
              MR <Text style={{ color: colors.green }}>Cuban</Text>
            </Text>
            <Text>
              <ActivityIndicator color={"#fff"} size={"large"} />
            </Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.topWrap}>
              <View style={styles.top}>
                <View style={styles.line}>
                  <View style={styles.circle}></View>
                  <View style={styles.wrap}>
                    <Text style={styles.sm}>Pickup Location</Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.p}
                    >
                      {state?.pickup_address}
                    </Text>
                  </View>
                </View>
                <View style={styles.line}>
                  <View style={styles.circle}></View>
                  <View style={styles.wrap}>
                    <Text style={styles.sm}>Drop Location</Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.p}
                    >
                      {" "}
                      {state?.drop_address}
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
                        More Details{" "}
                        <AntDesign name="up" size={12} color="white" />
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
                          {state?.pickup_date + " " + state?.pickup_time}
                        </Text>
                      </View>
                    </View>
                    {state?.trip_type === "Round Trip" && (
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
                              {state?.return_pickup_address}
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
                              {state?.return_drop_address}
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
                              {state?.return_date + " " + state?.return_time}
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
                Select your ride and negotiate with the driver for the best
                fare.
              </Text>
            </View>

            <View style={styles.flat}>
              {rides?.length === 0 ? (
                <View style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center"}}>
                <View style={styles.loader2}>
                  <Image resizeMode="contain" style={{width:"100%",height:"100%"}} source={img3} />
                </View>
                </View>
              ) : (
                <FlatList
                  data={rides}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "/detail",
                          params: {
                            name: item?.name,
                            rating: item?.rating,
                            order: item?.orders,
                            price: item?.price,
                            pickup: state?.pickup_address,
                            drop: state?.drop_address,
                            way: state?.trip_type,
                            returnPickup: state?.return_pickup_address,
                            returnDrop: state?.return_drop_address,
                            dropDate: state?.return_date +" | " +state?.return_time,
                            pickupDate: state?.pickup_date + " | "+state?.pickup_time,
                            modelName: item?.model,
                            order_id:state?._id,
                            driver_id:item?.id
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
                        key={item?.id}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 20,
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
                                <Text style={{ color: colors.green }}>
                                  Orders
                                </Text>
                              </Text>
                            </View>
                          </View>
                          <View style={styles.right}>
                            <Text style={styles.h2}>{item.name}</Text>
                            <Text style={styles.p4}>
                              <Text>
                                Model Name:{" "}
                                <Text style={{ color: "white" }}>
                                  {item.model}
                                </Text>
                              </Text>
                            </Text>
                            <Text style={styles.p3}> ₹{item.price}</Text>
                          </View>
                        </View>
                        <View style={styles.inputset}>
                          <View style={styles.pin}>
                            <FontAwesome
                              name="map-pin"
                              size={24}
                              color="white"
                            />
                          </View>
                          <View style={styles.line2}></View>
                          <Text style={styles.ov}>{state?.trip_type}</Text>
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
              )}

              {rides?.length > 0 && (
                <AuthButton
                  title={"Cancel Ride"}
                  loading={loading2}
                  handlePress={CancelOrder}
                />
              )}
            </View>
          </View>
        )}
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
  loader: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    flex: 1,
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    gap: 10,
  },
  loader2: {
    width: 200,
    height: 200,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
