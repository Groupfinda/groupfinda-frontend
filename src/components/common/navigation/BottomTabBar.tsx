import React from "react";
import {
  Icon,
  IconProps,
  BottomNavigation,
  BottomNavigationTab,
} from "@ui-kitten/components";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const SwipeIcon = (props: IconProps) => <Icon {...props} name="browser" />;

const SearchIcon = (props: IconProps) => (
  <Icon {...props} name="search-outline" />
);

const CreateIcon = (props: IconProps) => (
  <Icon {...props} name="plus-square-outline" />
);

const ChatIcon = (props: IconProps) => (
  <Icon {...props} name="message-circle-outline" />
);

const ProfileIcon = (props: IconProps) => (
  <Icon {...props} name="home-outline" />
);
const BottomTabBar: React.FC<BottomTabBarProps> = ({ navigation, state }) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      appearance="noIndicator"
    >
      <BottomNavigationTab icon={SwipeIcon} />
      <BottomNavigationTab icon={SearchIcon} />
      <BottomNavigationTab icon={CreateIcon} />
      <BottomNavigationTab icon={ChatIcon} />
      <BottomNavigationTab icon={ProfileIcon} />
    </BottomNavigation>
  );
};

export default BottomTabBar;
