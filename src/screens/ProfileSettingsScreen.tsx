import React from "react";
import { ProfileSettingsScreenNavigationProp } from "../navigation/types";
import { ProfileSettings } from "../components/Profile";

type Props = ProfileSettingsScreenNavigationProp;

const ProfileSettingsScreen: React.FC<Props> = ({ navigation }) => {
  return <ProfileSettings></ProfileSettings>;
};

export default ProfileSettingsScreen;
