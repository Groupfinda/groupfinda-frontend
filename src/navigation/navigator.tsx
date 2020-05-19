import React from "react";
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
} from "../screens";
import { RootStackParamList } from "./types";

export default () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator<RootStackParamList>();
  const isLoggedIn = false;

  const TabNavigation: React.FC = () => (
    <Tab.Navigator initialRouteName="Swipe">
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Swipe" component={SwipeScreen} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Main" component={TabNavigation} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LogIn"
              component={LogInScreen}
              options={{ header: () => null }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ header: () => null }}
            />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPasswordScreen}
              options={{ title: "Forgot Password", headerBackTitle: "Back" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
