import {
  Image,
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
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [show, setShow] = useState(true);
  const [name,setName] = useState("")
  const [email, setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [password, setPassword] = useState("");

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
            Register to{" "}
            <Text
              style={{
                color: colors.primary,
                fontFamily: "bold",
                fontWeight: "bold",
              }}
            >
              MR <Text  style={{
                color: colors.green,
                fontFamily: "bold",
                fontWeight: "bold",
              }}>CUBAN</Text>
            </Text>
          </Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input1]}
              placeholder="Enter Your Name"
              onChangeText={(e) => setName(e)}
              value={name}
              placeholderTextColor={"gray"}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input1]}
              placeholder="Enter Email Address"
              onChangeText={(e) => setEmail(e)}
              value={email}
              placeholderTextColor={"gray"}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={[styles.input1]}
              placeholder="Enter Phone Number"
              onChangeText={(e) => setPhone(e)}
              value={phone}
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
                value={password}
                onChangeText={(e)=>setPassword(e)}
                placeholderTextColor={"gray"}
              />
              {show ? (
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Image
                    style={styles.lock}
                    source={lock}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setShow(true)}>
                  <Image
                    style={styles.lock}
                    source={unlock}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.footer}>
        <Text style={styles.footerText}>   Already have an account?</Text>
        <TouchableOpacity onPress={()=>router.push("/sign-in")}>
          <Text style={styles.createAccountText}>Log In</Text>
        </TouchableOpacity>
      </View>
      
          <AuthButton title="Register" handlePress={() => router.push("/home")} />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default SignUp;

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
    fontSize: 50,
    color: colors.primary,
  },

  p2: {
    width: "100%",
    color: "#fff",
    fontSize: 18,
    fontFamily: "regular",
    marginBottom: 20,
    fontWeight: "regular",
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
    width:"100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 5,
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:"row",
    paddingRight:10
 
  },
  lock:{
    width:20,
    height:20
  }
  ,
  footer:{
    display:"flex",
    flexDirection:"row",
    width:"100%"
  },
  footerText: {
    color: '#fff',
  display:"flex"
  },
  createAccountText: {
    color: colors.primary,
    textDecorationLine: 'none',
    marginLeft:5
  },
});
