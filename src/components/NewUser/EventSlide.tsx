import React, { Component } from 'react';
import { Image, View } from 'react-native';
import Constants from 'expo-constants'
import { useStyleSheet, StyleService, Layout, Text } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Loading } from '../common';

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  let [fontsLoaded] = useFonts({
    Inter_900Black
  })

  if (!fontsLoaded) {
    return <Loading visible />
  }
  
  return (
    <View style={styles.imageContainer}>
      <Image source={require("./assets/eventgif.gif")}
        style={{width: 215, height: 370, marginBottom: 20}} />
      <Text style={{fontFamily: "Inter_900Black", margin: 20}}
        category='h4'
        status="primary">
        Find and Join Events
      </Text>
      <Text category='h6'
        style={{paddingHorizontal: 30, textAlign:"center"}}>
        Our Swipe and Search features allow you to search and register for events
      </Text>
    </View>
  );
}

const themedStyle = StyleService.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 30
  },
})
