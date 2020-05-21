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
} from "../screens";
import { RootStackParamList } from "./types";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../graphql/queries";

type MeType = {
  id: string;
  username: string;
};

export default () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator<RootStackParamList>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<MeType | null>(null);
  const { data, loading } = useQuery<{ me: MeType }, void>(ME);

  useEffect(() => {
    if (data) {
      setIsLoading(loading);
      setUser(data.me);
    }
  }, [data, loading]);

  const TabNavigation: React.FC = () => (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Swipe" component={SwipeScreen} />
    </Tab.Navigator>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
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
