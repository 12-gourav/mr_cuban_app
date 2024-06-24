import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../assets/color";

const AuthButton = ({ title,handlePress }) => {
    
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
      <Text style={styles.p1}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  p1: {
    color: "#fff",
    fontFamily: "Lato-Bold",
    marginTop: 0,
    fontWeight: 500,
    padding:0
  },
});
