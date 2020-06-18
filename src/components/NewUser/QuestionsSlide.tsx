import React, { Component } from 'react';
import { Image, View } from 'react-native';
import Constants from 'expo-constants'
import { useStyleSheet, StyleService, Layout, Text } from '@ui-kitten/components';

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  
  return (
    <View style={styles.imageContainer}>
      <Image source={require("./assets/questionsgif.gif")}
        style={{width: 215, height: 370, marginBottom: 20}} />
      <Text style={{fontFamily: "Inter_900Black", margin: 20}}
        category='h4'
        status="primary">
        Personal Questionnaire
      </Text>
      <Text category='h6'
        style={{paddingHorizontal: 30, textAlign:"center"}}>
        Answer personality questions to improve your chances of matching up with like-minded individuals
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
