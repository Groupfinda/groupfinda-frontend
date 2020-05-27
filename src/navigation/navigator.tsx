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
} from "../screens";
import { RootStackParamList } from "./types";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../graphql/queries";
import { ChangePassword } from "../components/Profile";
import { BottomTabBar } from "../components/common";

type MeType = {
  id: string;
  username: string;
};

export default () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator<RootStackParamList>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<MeType | null>(null);
  const { data, loading, error } = useQuery<{ me: MeType }, void>(ME);

  useEffect(() => {
    if (data) {
      setIsLoading(loading);
      setUser(data.me);
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
            <Stack.Screen name="Main" component={TabNavigation} />
            <Stack.Screen
              name="ProfileSettings"
              component={ProfileSettingsScreen}
              options={{ title: "Profile Settings", headerBackTitle: "Back" }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{ title: "Change Password", headerBackTitle: "Back" }}
            />
            <Stack.Screen
              name="Questions"
              component={QuestionsScreen}
            />
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
