import React from "react";
import {
  ScrollView,
  View,
  YellowBox,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
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
  Divider,
  ListItem,
} from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { ProfileSocial } from "./extra/profile-social.component";
import { DrawerGroupUser } from "./extra/drawer.component";
import { useNavigation } from "@react-navigation/native";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { USER } from "../../graphql/queries";
import { Loading } from "../common";
import { SettingsIcon } from "./extra/icons";
import { BasicEventType } from "../types";

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
  return <Icon width={16} height={16} fill="white" name="clipboard" />;
};

export default (): React.ReactElement => {
  const client = useApolloClient();
  const styles = useStyleSheet(themedStyle);
  const theme = useTheme();
  const navigation = useNavigation();

  const { loading, error, data } = useQuery(USER);

  if (error) {
    return (
      <View style={[styles.errorContainer]}>
        <View>
          <Text style={{ textAlign: "center" }}>
            Something went wrong: Please restart the application or contact the
            Development team
          </Text>
        </View>
      </View>
    );
  }

  if (loading || !data || !data.me) {
    return (
      <ScrollView style={styles.container}>
        <Loading visible={loading} />
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <React.Fragment>
          <ImageOverlay
            style={styles.header}
            source={require("./temp/image-background.jpg")}
          >
            <Layout style={styles.layoutContainer}>
              <Layout style={styles.layout} level="1">
                <Button
                  status="control"
                  appearance="ghost"
                  accessoryLeft={QuestionsIcon}
                  onPress={() => {
                    navigation.navigate("Questions");
                  }}
                >
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
              source={{ uri: data.me.avatar }}
            />
            <Text style={styles.profileName} category="h5" status="control">
              {data.me.firstName} {data.me.lastName}
            </Text>
            <View style={styles.locationContainer}>
              <PinIcon />
              <Text style={styles.location} status="control">
                {data.me.location}
              </Text>
            </View>
            <View style={styles.socialsContainer}>
              <ProfileSocial
                style={styles.profileSocial}
                hint="Events"
                value={data.me.profile.eventsRegistered.length}
              />
              <ProfileSocial
                style={styles.profileSocial}
                hint="Like/Dislikes"
                value={
                  data.me.profile.eventsLiked.length +
                  data.me.profile.eventsDisliked.length
                }
              />
              {/* <ProfileSocial
                style={styles.profileSocial}
                hint="Groups"
                value={data.me.groups.length}
              /> */}
              <ProfileSocial
                style={styles.profileSocial}
                hint="Interests"
                value={data.me.profile.userHobbies.length}
              />
            </View>
          </ImageOverlay>
          <Divider />
          <Layout style={{ padding: 12 }}>
            <Text style={{ fontWeight: "bold" }} category="h6">
              Profile Overview
            </Text>
            <ListItem
              disabled
              title="Hobbies/Interests"
              description={data.me.profile.userHobbies.join(", ")}
              accessoryLeft={() => (
                <Icon
                  width={20}
                  height={20}
                  fill={theme["color-primary-default"]}
                  name="brush-outline"
                />
              )}
            />
            <ListItem
              disabled
              title="Faculty"
              description={data.me.profile.userFaculty}
              accessoryLeft={() => (
                <Icon
                  width={20}
                  height={20}
                  fill={theme["color-primary-default"]}
                  name="book-outline"
                />
              )}
            />
            <ListItem
              disabled
              title="Year of Study"
              description={data.me.profile.userYearOfStudy}
              accessoryLeft={() => (
                <Icon
                  width={20}
                  height={20}
                  fill={theme["color-primary-default"]}
                  name="clock-outline"
                />
              )}
            />
          </Layout>
          <Divider />
          <DrawerGroupUser
            eventsLiked={data.me.profile.eventsLiked}
            eventsRegistered={data.me.profile.eventsRegistered.filter(
              (event: BasicEventType) =>
                event.dateOfEvent > new Date().getTime()
            )}
          />
          <Button
            status="danger"
            onPress={async () => {
              await AsyncStorage.removeItem("userToken");
              client.resetStore();
            }}
          >
            Log out
          </Button>
        </React.Fragment>
      </ScrollView>
    );
  }
};

const themedStyle = StyleService.create({
  errorContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 12,
  },
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
