import React from "react";
import { ScrollView, View, YellowBox, TouchableOpacity, AsyncStorage } from "react-native";
import {
  Avatar,
  Button,
  StyleService,
  Text,
  useStyleSheet,
  IconElement,
  useTheme,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { ProfileSocial } from "./extra/profile-social.component";
import { DrawerGroupUser } from "./extra/drawer.component";
import { useNavigation } from "@react-navigation/native";
import { useLazyQuery, useApolloClient } from "@apollo/react-hooks";
import { USER } from "../../graphql/queries";
import { Loading } from "../common";
import { SettingsIcon } from "./extra/icons";

YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

const PinIcon = (): IconElement => {
  const theme = useTheme();
  return (
    <Icon
      width={16}
      height={16}
      fill={theme["text-control-color"]}
      name="pin"
    />
  );
};

const QuestionsIcon = (): IconElement => {
  return (
    <Icon
      width={16}
      height={16}
      fill="white"
      name='clipboard'
    />
  )
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export default (): React.ReactElement => {
  const client = useApolloClient();
  const styles = useStyleSheet(themedStyle);

  const navigation = useNavigation();

  const [getCurrentUser, { loading, error, data }] = useLazyQuery(USER);
  let isMounted = true;
  React.useEffect(() => {
    if (isMounted) {
      getCurrentUser();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Loading visible={loading} />
      ) : (
        <React.Fragment>
          <ImageOverlay
            style={styles.header}
            source={require("./temp/image-background.jpg")}
          >
            <Layout style={styles.layoutContainer}>
              <Layout style={styles.layout} level="1">
                <Button
                  status='control'
                  appearance='ghost'
                  accessoryLeft={QuestionsIcon}
                  onPress={() => {
                    navigation.navigate("Questions")
                  }}>
                  Questions
                </Button>
                <TouchableOpacity>
                  <Button
                    status="control"
                    appearance="ghost"
                    accessoryLeft={SettingsIcon}
                    onPress={() => {
                      navigation.navigate("ProfileSettings");
                    }}
                  >
                    Profile Settings
                  </Button>
                </TouchableOpacity>
              </Layout>
            </Layout>
            <Avatar
              style={{ width: 148, height: 148, marginBottom: 16 }}
              source={require("./temp/gab.jpg")}
            />
            {data && (
              <Text style={styles.profileName} category="h5" status="control">
                {data.me.firstName} {data.me.lastName}
              </Text>
            )}
            <View style={styles.locationContainer}>
              <PinIcon />
              <Text style={styles.location} status="control">
                University Town
              </Text>
            </View>
            <View style={styles.socialsContainer}>
              <ProfileSocial
                style={styles.profileSocial}
                hint="Events"
                value="7"
              />
              <ProfileSocial
                style={styles.profileSocial}
                hint="Groups"
                value="6"
              />
              <ProfileSocial
                style={styles.profileSocial}
                hint="Interests"
                value="13"
              />
            </View>
          </ImageOverlay>
          <DrawerGroupUser />
          <Button
            status='danger'
            onPress={async () => {
              await AsyncStorage.removeItem("userToken");
              client.resetStore();
            }}>
            Log out
          </Button>
        </React.Fragment>
      )}
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  layoutContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  layout: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
  header: {
    paddingVertical: 24,
    alignItems: "center",
  },
  profileName: {
    zIndex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    marginVertical: 8,
  },
  profileButtonsContainer: {
    flexDirection: "row",
    marginVertical: 32,
    marginHorizontal: 20,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  socialsContainer: {
    flexDirection: "row",
    width: "75%",
    marginVertical: 8,
  },
  profileSocial: {
    flex: 1,
  },
});
