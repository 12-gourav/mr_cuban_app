import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../assets/color'

const Offers = () => {
  return (
    <SafeAreaView style={{flex:1}}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.wrap}>
      <Text style={styles.title}>Discover <Text style={{color:colors.primary}}>iOffer</Text></Text>
      <Text style={styles.dis}>Explore our exclusive iOffer section to find unique deals and special packages tailored just for you. Whether you're looking for luxury upgrades, family-friendly options, or budget-friendly rides, iOffer has something to suit every journey. Unlock personalized offers and enhance your booking experience with added convenience and savings.</Text>
    </View>
      </ScrollView>


    </SafeAreaView>
 
  )
}

export default Offers

const styles = StyleSheet.create({
wrap:{
  backgroundColor:"#000",
  flex:1,
  padding:20
},
title:{
  fontSize:30,
  fontFamily:"bold",
  fontWeight:"bold",
  color:"#fff"
},
dis:{
  fontWeight:"regular",
  color:"#fff",
  lineHeight:20,
  textAlign:"justify",marginTop:10
}
})