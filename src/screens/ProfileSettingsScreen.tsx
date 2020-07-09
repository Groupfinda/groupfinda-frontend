import React from "react";
import { ProfileSettingsScreenNavigationProp } from "../navigation/types";
import { ProfileSettings } from "../components/Profile";
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = ProfileSettingsScreenNavigationProp;

const ProfileSettingsScreen: React.FC<Props> = ({ navigation }) => {
  return <SafeAreaView style={{ flex: 1 }}>
    <ProfileSettings></ProfileSettings>
  </SafeAreaView>
};

export default ProfileSettingsScreen;
