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

export default () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const isLoggedIn = false;

  const TabNavigation: React.FC = () => (
    <Tab.Navigator initialRouteName="Swipe">
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Swipe" component={SwipeScreen} />
    </Tab.Navigator>
  );

  const authScreenHeaderOptions = {
    headerTitleStyle: { alignSelf: "center" },
    title: "Groupfinda",
  };
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
              options={authScreenHeaderOptions}
              name="LogIn"
              component={LogInScreen}
            />
            <Stack.Screen
              options={authScreenHeaderOptions}
              name="SignUp"
              component={SignUpScreen}
            />
            <Stack.Screen
              options={authScreenHeaderOptions}
              name="ForgetPassword"
              component={ForgetPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
