import React from "react";
import { NewUsersNavigationProp } from "../navigation/types";
import { ViewPager, Layout, StyleService, useStyleSheet, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { QuestionsSlide, IntroSlide, FormSlide, EventSlide } from "../components/NewUser";
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import { Platform } from "react-native";
import * as Notifications from 'expo-notifications'
import { useMutation } from '@apollo/react-hooks'
import { ADD_EXPO_TOKEN, AddExpoTokenData, AddExpoTokenVariables } from '../graphql/mutations'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = NewUsersNavigationProp;

const NewUserScreen: React.FC<Props> = ({ navigation }) => {
    const styles = useStyleSheet(themedStyle);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [numPages, setIntervals] = React.useState(4);
    const [addExpoToken] = useMutation<AddExpoTokenData, AddExpoTokenVariables>(ADD_EXPO_TOKEN)

    React.useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            if (token) {
                return addExpoToken({ variables: { token } })
            }
        }).then(data => console.log("Got data ", data))
    }, [])

    let bullets = [];
    for (let i = 0; i < numPages; i++) {
        bullets.push(
            <Text
                key={i}
                style={{
                    ...styles.bullet,
                    opacity: selectedIndex === i ? 0.7 : 0.1,
                }}>
                &bull;
        </Text>
        );
    }

    return (
        <SafeAreaView>
            <ViewPager
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <Layout
                    style={styles.tab}>
                    <IntroSlide />
                </Layout>
                <Layout
                    style={styles.tab}>
                    <EventSlide />
                </Layout>
                <Layout
                    style={styles.tab}>
                    <QuestionsSlide />
                </Layout>
                <Layout
                    style={styles.tab}>
                    <FormSlide />
                </Layout>
            </ViewPager>
            {selectedIndex !== 3 ?
                <View style={styles.bullets}>{bullets}</View> : null}
        </SafeAreaView>
    )
};

const themedStyle = StyleService.create({
    tab: {
        height: "100%",
    },
    bullets: {
        position: "absolute",
        bottom: 32,
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    bullet: {
        paddingHorizontal: 5,
        fontSize: 30,
    }
})

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert("Notifications allow us to send you updates on group matches and chat messages!")
            return
        }

        token = (await Notifications.getExpoPushTokenAsync()).data
        console.log(token)
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C"
        })
    }

    return token
}

export default NewUserScreen;