import React, { useState } from "react";
import { EventScreenNavigationProp } from "../navigation/types";
import {
  Layout,
  useTheme,
  Text,
  StyleService,
  useStyleSheet,
  Icon,
  Divider,
  ListItem,
  Button,
  Avatar,
} from "@ui-kitten/components";
import Carousel from "../components/common/Carousel";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@apollo/react-hooks";
import { singleEvent } from "../graphql/queries";
import { Loading } from "../components/common";

type Props = EventScreenNavigationProp & {
  route: {
    params: {
      id: string;
    };
  };
};

const EventScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyle);
  const { id } = route.params;
  const { loading, error, data } = useQuery(singleEvent, {
    variables: { eventId: id },
  });
  const [eventLiked, setEventLiked] = useState<boolean>(false);
  const [eventRegistered, setEventRegistered] = useState<boolean>(false);
  //Link to profile and check if event has been liked/registered

  const likeEventHandler = () => {
    // Post to profile to like/unlike event
    setEventLiked(!eventLiked);
  };

  const registerEventHandler = () => {
    // Navigate to event registration page?
    setEventRegistered(!eventRegistered);
  };

  if (!data) {
    return <Loading visible />;
  } else {
    const event = data["getEvent"];
    //Add fake registered users for now
    const randomGuy =
      "https://img3.stockfresh.com/files/p/palangsi/m/45/894367_stock-photo-vietnamese-man-meditating-pose.jpg";
    const randomImage =
      "https://image.jimcdn.com/app/cms/image/transf/none/path/sa716b1500dd60f05/image/ic839a74ed6a8a054/version/1519833130/image.jpg";
    event["registeredUsers"] = [
      { avatar: randomImage, id: 1 },
      { avatar: randomGuy, id: 2 },
      { avatar: randomGuy, id: 3 },
      { avatar: randomImage, id: 4 },
      { avatar: randomGuy, id: 5 },
      { avatar: randomImage, id: 6 },
    ];
    const dateOfEvent = new Date(event["dateOfEvent"]);
    const dateLastRegister = new Date(event["dateLastRegister"]);
    return (
      <Layout style={{ padding: 0 }}>
        <Layout style={styles.headerLayout}>
          <Layout level="1" style={{ backgroundColor: "transparent" }}>
            <Icon
              height={30}
              width={30}
              fill="white"
              name="close-outline"
              onPress={() => navigation.goBack()}
            />
          </Layout>
        </Layout>
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 70,
            zIndex: 10,
          }}
        />
        <Carousel items={event.images} imageHeight={240} />
        <Layout>
          <ScrollView style={styles.scrollViewContainer}>
            <Layout style={styles.contentContainer}>
              <Layout style={styles.contentHeader}>
                <Text
                  category="h2"
                  style={{
                    color: theme["color-primary-600"],
                    fontWeight: "bold",
                  }}
                >
                  {event.title}
                </Text>
                <Text style={{ color: "grey" }} category="s2">
                  Created by {event.owner.username}{" "}
                  <Avatar size="tiny" source={{ uri: event.owner.avatar }} />{" "}
                  {/*  ({event.owner.firstName} {event.owner.lastName}) */}
                </Text>
                <Layout
                  style={{
                    marginTop: 15,
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    style={{ borderRadius: 100 }}
                    appearance={eventLiked ? "filled" : "outline"}
                    status={eventLiked ? "danger" : "basic"}
                    onPress={likeEventHandler}
                    accessoryLeft={() => (
                      <Icon
                        height={16}
                        width={16}
                        fill={
                          eventLiked ? "white" : theme["color-danger-default"]
                        }
                        name="heart-outline"
                      />
                    )}
                  >
                    {eventLiked ? "Event Liked!" : "Like Event"}
                  </Button>
                  <Button
                    style={{ borderRadius: 100 }}
                    appearance={eventRegistered ? "filled" : "outline"}
                    status={eventRegistered ? "primary" : "basic"}
                    onPress={registerEventHandler}
                    accessoryLeft={() => (
                      <Icon
                        height={16}
                        width={16}
                        fill={
                          eventRegistered
                            ? "white"
                            : theme["color-primary-default"]
                        }
                        name="clipboard-outline"
                      />
                    )}
                  >
                    {eventRegistered ? "Registered!" : "Sign Me Up!"}
                  </Button>
                </Layout>
              </Layout>
              <Divider />
              <Layout style={styles.contentBody}>
                <Text style={{ fontWeight: "bold" }} category="h6">
                  EVENT DETAILS
                </Text>
                <ListItem
                  disabled
                  title={(props) => <Text {...props}>Event Code</Text>}
                  description={(props) => (
                    <Text {...props}>{event.eventCode}</Text>
                  )}
                  accessoryLeft={() => (
                    <Icon
                      width={30}
                      height={30}
                      fill={theme["color-primary-default"]}
                      name="at-outline"
                    />
                  )}
                />
                <ListItem
                  disabled
                  title={(props) => <Text {...props}>Date and Time</Text>}
                  description={(props) => (
                    <Text {...props}>
                      {dateOfEvent.toString().substring(0, 21)}
                    </Text>
                  )}
                  accessoryLeft={() => (
                    <Icon
                      width={30}
                      height={30}
                      fill={theme["color-primary-default"]}
                      name="clock-outline"
                    />
                  )}
                />
                <ListItem
                  disabled
                  title="Location"
                  description={(props) => (
                    <Text {...props}>
                      {event.location.address}, Singapore{" "}
                      {event.location.postalCode}
                    </Text>
                  )}
                  accessoryLeft={() => (
                    <Icon
                      width={30}
                      height={30}
                      fill={theme["color-primary-default"]}
                      name="pin-outline"
                    />
                  )}
                />
                <ListItem
                  disabled
                  title="Group Size"
                  description={(props) => (
                    <Text {...props}>{event.groupSize}</Text>
                  )}
                  accessoryLeft={() => (
                    <Icon
                      width={30}
                      height={30}
                      fill={theme["color-primary-default"]}
                      name="people-outline"
                    />
                  )}
                />
                <ListItem
                  disabled
                  title={(props) => (
                    <Text {...props}>Registration Deadline</Text>
                  )}
                  description={(props) => (
                    <Text {...props}>
                      {dateLastRegister.toString().substring(0, 21)}
                    </Text>
                  )}
                  accessoryLeft={() => (
                    <Icon
                      width={30}
                      height={30}
                      fill={theme["color-primary-default"]}
                      name="info-outline"
                    />
                  )}
                />
              </Layout>
              <Divider />
              <Layout style={styles.contentBody}>
                <Text
                  style={{ fontWeight: "bold", marginBottom: 10 }}
                  category="h6"
                >
                  EVENT DESCRIPTION
                </Text>
                <Text>{event.description}</Text>
              </Layout>

              <Divider />
              <Layout style={styles.contentBody}>
                <Text
                  style={{ fontWeight: "bold", marginBottom: 10 }}
                  category="h6"
                >
                  REGISTERED USERS
                </Text>
                <Layout style={{ flexDirection: "row", alignItems: "center" }}>
                  {event.registeredUsers.slice(0, 5).map((user: any) => (
                    <Avatar
                      style={{ marginRight: 10 }}
                      size="medium"
                      key={user.id}
                      source={{ uri: user.avatar }}
                    />
                  ))}
                  {event.registeredUsers.length > 5 ? (
                    <Text category="s2" status="primary">
                      +{event.registeredUsers.length - 5} more
                    </Text>
                  ) : null}
                </Layout>
              </Layout>
            </Layout>
          </ScrollView>
        </Layout>
      </Layout>
    );
  }
};

const themedStyle = StyleService.create({
  headerLayout: {
    flexDirection: "row",
    position: "absolute",
    paddingHorizontal: 12,
    paddingTop: 23,
    zIndex: 100,
    backgroundColor: "transparent",
  },
  scrollViewContainer: {
    backgroundColor: "background-basic-color-1",
    borderRadius: 20,
    marginTop: -25,
    marginBottom: 500,
  },
  contentContainer: {
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  contentHeader: {
    paddingVertical: 20,
  },
  contentBody: {
    paddingVertical: 20,
  },
});

export default EventScreen;
