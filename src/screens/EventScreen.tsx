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
  Spinner,
} from "@ui-kitten/components";
import Carousel from "../components/common/Carousel";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { singleEvent } from "../graphql/queries";
import { Loading } from "../components/common";
import { REGISTER_EVENT, VIEW_EVENT } from "../graphql/mutations";
import { View } from "react-native";

type Props = EventScreenNavigationProp & {
  route: {
    params: {
      id: string;
    };
  };
  userId: string
};

const EventScreen: React.FC<Props> = ({ navigation, route, userId }) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyle);
  const { id } = route.params;
  const [eventRegistered, setEventRegistered] = useState<boolean>(false);
  const [registerEventLoading, setRegisterEventLoading] = useState<boolean>(true);

  const { loading, error, data } = useQuery(singleEvent, {
    variables: { eventId: id },
    onCompleted: (response) => {
      const eventData = response['getEvent'];
      setEventRegistered(eventData.registeredUsers.some((el: any) => el.id === userId))
      setRegisterEventLoading(false);
    },
    onError: (err) => {
      console.log(err)
      setRegisterEventLoading(false);
    }
  });

  const [ registerEvent ] = useMutation(
    REGISTER_EVENT,
    {
      onCompleted: (data) => {
        if (data.registerEvent.id === id) {
          setEventRegistered(true);
        }
        setRegisterEventLoading(false);
      },
      onError: (err) => {
        console.log(err)
        if (err.graphQLErrors.some(el=>el.message.includes("User is already registered"))) {
          setEventRegistered(true);
        }
        setRegisterEventLoading(false);
      },
      errorPolicy: 'all'
    }
  )

  const registerEventHandler = () => {
    setRegisterEventLoading(true);
    if (!eventRegistered) {
      const variables = {
        eventId: id
      }
      registerEvent({ variables })
    } else {
      //unregister event
      setEventRegistered(!eventRegistered);
      setRegisterEventLoading(false);
    }
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
    event["registeredUsers"].push(...[
      { avatar: randomImage, id: 1 },
      { avatar: randomGuy, id: 2 },
      { avatar: randomGuy, id: 3 },
      { avatar: randomImage, id: 4 },
      { avatar: randomGuy, id: 5 },
      { avatar: randomImage, id: 6 },
    ]);
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
                    justifyContent: "center",
                  }}
                >
                  <Button
                    disabled={registerEventLoading}
                    style={{ borderRadius: 100, width: "100%" }}
                    appearance={eventRegistered ? "filled" : "outline"}
                    status={eventRegistered ? "primary" : "basic"}
                    onPress={registerEventHandler}
                    accessoryLeft={() => {
                      if (registerEventLoading) {
                        return <View>
                          <Spinner/>
                        </View>
                      }
                      return (<Icon  
                        height={16}
                        width={16}
                        fill={
                          eventRegistered
                            ? "white"
                            : theme["color-primary-default"]
                        }
                        name="clipboard-outline"
                      />
                    )}}
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
                  title={(props) => <Text {...props}>Event Code: <Text style={{color:theme["color-primary-default"]}}>{event.eventCode}</Text></Text>}
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
