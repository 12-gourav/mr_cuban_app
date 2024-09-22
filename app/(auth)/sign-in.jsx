import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../assets/color";
import img from "../../assets/img/login.jpg";
import AuthButton from "../../components/AuthButton";
import lock from "../../assets/img/lock.png";
import unlock from "../../assets/img/unlock.png";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginApi } from "../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const {isValid} = useSelector((state)=>state.user);
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  

  const handleLogin = async () => {
    try {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email === "") {
        return ToastAndroid.show("Email is required", ToastAndroid.SHORT);
      }

      if (!emailPattern.test(email)) {
        return ToastAndroid.show("Invalid email address", ToastAndroid.SHORT);
      }

      if (password === "") {
        return ToastAndroid.show("Password is required", ToastAndroid.SHORT);
      }

      if (password?.length < 6) {
        return ToastAndroid.show("Password is too short", ToastAndroid.SHORT);
      }

      if (password?.length > 16) {
        return ToastAndroid.show("Password is too long", ToastAndroid.SHORT);
      }
      setLoading(true);
      const result = await LoginApi(email, password);
      if (result?.data?.data) {
        await AsyncStorage.setItem("token", result?.data?.token);
        dispatch({ type: "login", payload: result?.data?.data });
        router.replace("/home");
        ToastAndroid.show("Login Successfull", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Login Failed", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error?.response?.data?.msg, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };



  useEffect(()=>{
    if(isValid){
      router.replace("/home")
    }
  },[isValid])





console.log(isValid,"ssss")






  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={img}
        style={{ flex: 1, position: "relative" }}
        resizeMode="cover"
      />
      <View style={styles.layer}>
        <Text style={styles.p2}>
          Log in to{" "}
          <Text
            style={{
              color: colors.primary,
              fontFamily: "bold",
              fontWeight: "bold",
            }}
          >
            MR{" "}
            <Text
              style={{
                color: colors.green,
                fontFamily: "bold",
                fontWeight: "bold",
              }}
            >
              CUBAN
            </Text>
          </Text>
        </Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input1]}
            placeholder="Enter Email Address"
            onChangeText={(e) => setEmail(e)}
            placeholderTextColor={"gray"}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.group}>
            <TextInput
              style={styles.input2}
              placeholder="Enter Password"
              secureTextEntry={show}
              placeholderTextColor={"gray"}
              onChangeText={(e) => setPassword(e)}
            />
            {show ? (
              <TouchableOpacity onPress={() => setShow(false)}>
                <Image style={styles.lock} source={lock} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setShow(true)}>
                <Image style={styles.lock} source={unlock} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text style={styles.createAccountText}>Create new account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>

          <TouchableOpacity onPress={() => router.push("/forget")}>
            <Text style={styles.footerText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>


        <AuthButton loading={loading} title="Login" handlePress={() => handleLogin()} />
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
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
  },
  heading: {
    fontWeight: "bold",
    fontFamily: "bold",
    fontSize: 40,
    color: colors.primary,
  },

  p2: {
    width: "100%",
    color: "#fff",
    fontSize: 18,
    fontFamily: "bold",
    marginBottom: 20,
    fontWeight: "bold",
  },
  formGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "regular",
  },
  input1: {
    width: "100%",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "transparent",
    outlineStyle: "none",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  input2: {
    width: "90%",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "transparent",
    outlineStyle: "none",
  },
  group: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 10,
  },
  lock: {
    width: 20,
    height: 20,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  footerText: {
    color: "#fff",
    display: "flex",
  },
  createAccountText: {
    color: colors.primary,
    textDecorationLine: "none",
    marginLeft: 5,
  },
});
