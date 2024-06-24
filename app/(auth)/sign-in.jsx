import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../assets/color";
import img from "../../assets/img/login.jpg";
import AuthButton from "../../components/AuthButton";
import lock from "../../assets/img/lock.png";
import unlock from "../../assets/img/unlock.png";
import { Link, router } from "expo-router";

const SignIn = () => {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(show);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
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
                fontFamily: "regular",
                fontWeight: 600,
              }}
            >
              MR <Text  style={{
                color: colors.green,
                fontFamily: "regular",
                fontWeight: 600,
              }}>CUBAN</Text>
            </Text>
          </Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input1]}
              placeholder="Enter Email Address"
              onChangeText={(e) => setEmail(e)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.group}>
              <TextInput
                style={styles.input2}
                placeholder="Enter Password"
                secureTextEntry={show}
              />
              {show ? (
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Image
                    style={{ width: 20, height: 20, marginRight: 15 }}
                    source={lock}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setShow(true)}>
                  <Image
                    style={{ width: 20, height: 20, marginRight: 15 }}
                    source={unlock}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text style={styles.link}>
            Don't have an account?{" "}
            <TouchableOpacity activeOpacity={0.7} onPress={()=>router.push("/sign-up")}>
              <Text>Create a new account</Text>
            </TouchableOpacity>
          </Text>

          <AuthButton title="Login" handlePress={() => router.push("/home")} />
        </View>
      </ScrollView>
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
    backgroundColor: "rgba(0,0,0,0.6)",
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
    fontWeight: "700",
    fontFamily: "regular",
    fontSize: "40px",
    color: colors.primary,
  },

  p2: {
    width: "100%",
    color: "#fff",
    fontSize: 18,
    fontFamily: "regular",
    marginBottom: 20,
    fontWeight: 500,
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
    width: "100%",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "transparent",
    outlineStyle: "none",
  },
  group: {
    display: "flex",
    gap: 5,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 5,
  },
  link:{
    color:"white",
    width:"100%",
    marginBottom:10
  }
});
