import React from 'react';
import { View, Image } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import Constants from 'expo-constants'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Loading } from '../common';

export default (): React.ReactElement => {
    const styles = useStyleSheet(themedStyle);
    let [fontsLoaded] = useFonts({
        Inter_900Black,
    });

    if (!fontsLoaded) {
        return <Loading visible />
    }
    else {
    return (
        <View style={styles.container}>
            <Image source={require("./assets/logov2.png")}
                style={{width:120, height:120}}/>
            <Image source={require("./assets/intro.gif")}
                style={{width:220, height: 220, marginBottom: 30}} />
            <Text style={{fontFamily: "Inter_900Black", margin: 20}}
                category='h4'
                status="primary">
                Welcome to GroupFinda
            </Text>
            <Text category='h6'
                style={{paddingHorizontal: 30, textAlign:"center"}}>
                Find Events, Match with a group, Make new friends and have fun!
            </Text>
        </View>
    )}
}

const themedStyle = StyleService.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: Constants.statusBarHeight,
        justifyContent: 'center',
        paddingBottom: 30
    }
})