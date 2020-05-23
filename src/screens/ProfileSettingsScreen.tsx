import React from "react";
import { ScrollView } from "react-native";
import { ProfileSettingsScreenNavigationProp } from "../navigation/types";
import { Layout, Text } from "@ui-kitten/components";
import { ProfileSettings } from "../components/Profile";

type Props = ProfileSettingsScreenNavigationProp;

const ProfileSettingsScreen: React.FC<Props> = ({ navigation }) => {
  return <ProfileSettings></ProfileSettings>;
};

export default ProfileSettingsScreen;
