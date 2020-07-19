import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import {
  ChatScreen,
  ForgetPasswordScreen,
  LogInScreen,
  ProfileScreen,
  SearchScreen,
  SignUpScreen,
  SwipeScreen,
  LoadingScreen,
  ProfileSettingsScreen,
  CreateScreen,
  QuestionsScreen,
  CreateEventScreen,
  JoinEventScreen,
  MessageRoomScreen,
  NewEventScreen,
  OthersProfileScreen,
  SubmitReportScreen,
} from "../screens";
import { RootStackParamList } from "./types";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  ADD_EXPO_TOKEN,
  AddExpoTokenData,
  AddExpoTokenVariables,
} from "../graphql/mutations";
import { ME, MeData } from "../graphql/queries";
import { ChangePassword } from "../components/Profile";
import { BottomTabBar } from "../components/common";
import EventScreen from "../screens/EventScreen";
import NewUserScreen from "../screens/NewUserScreen";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

export default () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator<RootStackParamList>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<MeData["me"] | null>(null);
  const { data, loading, error } = useQuery<MeData, void>(ME);

  const [addExpoToken] = useMutation<AddExpoTokenData, AddExpoTokenVariables>(
    ADD_EXPO_TOKEN,
    {
      onError: () => {},
    }
  );

  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync();
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      setIsLoading(loading);
      if (data.me) setUser(data.me);
      else setUser(null);
    }
    if (error) {
      setIsLoading(false);
      setUser(null);
    }
  }, [data, loading]);

  const TabNavigation: React.FC = () => (
    <Tab.Navigator
      initialRouteName="Profile"
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Swipe" component={SwipeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert(
          "Notifications allow us to send you updates on group matches and chat messages!"
        );
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("Groupfinda", {
        name: "Groupfinda",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    if (token) {
      if (user?.expoToken !== token) {
        addExpoToken({ variables: { token: token as string } });
        console.log("adding token ", token);
      } else {
        console.log("Token already exists: ", user.expoToken);
      }
    } else {
      console.log("No token");
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}
      >
        {user ? (
          <>
            {user.newUser ? (
              <Stack.Screen name="NewUser" component={NewUserScreen} />
            ) : null}
            <Stack.Screen name="Main" component={TabNavigation} />
            <Stack.Screen
              name="ProfileSettings"
              component={ProfileSettingsScreen}
            />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="Questions" component={QuestionsScreen} />
            <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
            <Stack.Screen name="JoinEvent" component={JoinEventScreen} />
            <Stack.Screen name="EventPage">
              {(props) => <EventScreen {...props} userId={user.id} />}
            </Stack.Screen>
            <Stack.Screen name="MessageRoom" component={MessageRoomScreen} />
            <Stack.Screen name="NewEvent" component={NewEventScreen} />
            <Stack.Screen name="OthersProfile" component={OthersProfileScreen} />
            <Stack.Screen name="SubmitReport" component={SubmitReportScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
