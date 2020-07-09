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
} from "../screens";
import { RootStackParamList } from "./types";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../graphql/queries";
import { ChangePassword } from "../components/Profile";
import { BottomTabBar } from "../components/common";
import EventScreen from "../screens/EventScreen";
import NewUserScreen from "../screens/NewUserScreen";

import * as Notifications from 'expo-notifications'



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  })
})


type MeType = {
  id: string;
  username: string;
  newUser: boolean;
  expoToken: string;
};

export default () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator<RootStackParamList>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<MeType | null>(null);
  const { data, loading, error } = useQuery<{ me: MeType }, void>(ME);

  const [notification, setNotification] = useState<Notifications.Notification | boolean>(false);

  useEffect(() => {
    Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })
    Notifications.addNotificationResponseReceivedListener(response => console.log(response))
    return () => {
      Notifications.removeAllNotificationListeners();
    };
  }, [])
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

