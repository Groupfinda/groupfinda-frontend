import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from 'react-native';
import ContentView from '../components/Profile'
type Props = {};

const ProfileScreen: React.FC<Props> = (props) => {

  return (
    <ScrollView>
      <ContentView />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;