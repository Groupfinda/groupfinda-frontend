import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import { Platform } from "react-native";
import * as Notifications from 'expo-notifications'

export async function registerForPushNotificationsAsync() {
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
        Notifications.setNotificationChannelAsync('Groupfinda', {
            name: 'Groupfinda',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C"
        })
    }

    return token
}

export type GroupfindaBody = {
    id: string;
    type: string;
}

export type AndroidNotificationData = GroupfindaBody
export type IOSNotificationData = {
    aps: {
        alert: {
            body: string;
            "launch-image": string;
            subtitle: string;
            title: string;
        }
        category: string;
        sound: string;
        "thread-id": string;
    }
    body: GroupfindaBody
}