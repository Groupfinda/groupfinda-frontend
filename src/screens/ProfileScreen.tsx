import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ProfilePage } from '../components/Profile'
type Props = {};

const ProfileScreen: React.FC<Props> = (props) => {

  return (
      <ProfilePage />
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;