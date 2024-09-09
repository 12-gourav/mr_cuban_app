import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../assets/color";

const AuthButton = ({ title,handlePress,loading }) => {
    
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7} disabled={loading||false}>
      {loading ? <Text>Loading</Text>:<Text style={styles.p1}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  p1: {
    color: "#fff",
    fontFamily: "regular",
    fontWeight:"regular",
    marginTop: 0,
    padding:0
  },
});
