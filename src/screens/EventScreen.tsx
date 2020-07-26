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
  Modal,
  Card,
} from "@ui-kitten/components";
import Carousel from "../components/common/Carousel";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { singleEvent, ME, MeData } from "../graphql/queries";
import { Loading } from "../components/common";
import { REGISTER_EVENT, UNREGISTER_EVENT, DELETE_EVENT } from "../graphql/mutations";

import { View, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

type Props = EventScreenNavigationProp & {
  route: {
    params: {
      id: string;
    };
  };
  userId: string;
};

const EventScreen: React.FC<Props> = ({ navigation, route, userId }) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyle);
  const { id } = route.params;
  const [eventRegistered, setEventRegistered] = useState<boolean>(false);
  const [messageRoom, setMessageRoom] = useState<string>("");
  const [registerEventLoading, setRegisterEventLoading] = useState<boolean>(
    true
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const myData = useQuery<MeData, void>(ME);

  const { loading, error, data } = useQuery(singleEvent, {
    variables: { eventId: id },
    onCompleted: (response) => {
      setMessageRoom(response["getUserGroup"]);
      const eventData = response["getEvent"];
      setEventRegistered(
        eventData.registeredUsers.some((el: any) => el.id === userId)
      );
      setRegisterEventLoading(false);
    },
    onError: (err) => {
      console.log(err);
      setRegisterEventLoading(false);
    },
    fetchPolicy: "network-only",
  });

  const [registerEvent] = useMutation(REGISTER_EVENT, {
    onCompleted: (data) => {
      if (data.registerEvent.id === id) {
        setEventRegistered(true);
      }
      setRegisterEventLoading(false);
    },
    onError: (err) => {
      console.log(err);
      if (
        err.graphQLErrors.some((el) =>
          el.message.includes("User is already registered")
        )
      ) {
        setEventRegistered(true);
      }
      setRegisterEventLoading(false);
    },
    errorPolicy: "all",
  });

  const [unregisterEvent] = useMutation(UNREGISTER_EVENT, {
    onCompleted: (data) => {
      if (data.unregisterEvent.id === id) {
        setEventRegistered(false);
      }
      setRegisterEventLoading(false);
    },
    onError: (err) => {
      console.log(err);
      setRegisterEventLoading(false);
    },
  });

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    onCompleted: (data) => {
      if (data.deleteEvent) {
        navigation.goBack()
      }
    },
    onError: (err) => {
      console.log(err)
    }
  });

  const deleteEventHandler = () => {
    const variables = {
      eventId: id,
    };
    deleteEvent({ variables })
  };

  const registerEventHandler = () => {
    setRegisterEventLoading(true);
    if (!eventRegistered) {
      const variables = {
        eventId: id,
      };
      registerEvent({ variables });
    } else {
      if (messageRoom.length > 0) {

        navigation.reset({
          index: 1,
          routes: [
            { name: "Main" },
            { name: "MessageRoom", params: { messageRoom } },
          ],

        });
      } else {
        const variables = {
          eventId: id,
        };
        unregisterEvent({ variables });
      }
    }
  };

  const buttonText = () => {
    if (eventRegistered) {
      if (messageRoom.length > 0) {
        return "Successfully Matched, Visit Group";
      } else {
        return "Registered";
      }
    }
    return "Sign Me Up!";
  };

  if (!data) {
    return <Loading visible />;
  } else {
    const event = data["getEvent"];
    const dateOfEvent = new Date(event["dateOfEvent"]);
    const dateLastRegister = new Date(event["dateLastRegister"]);
    if (event.images.length === 0) {
      event.images.push(
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      );
    }
    return (
      <SafeAreaView style={{ padding: 0, flex: 1 }}>
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
                          return (
                            <View>
                              <Spinner />
                            </View>
                          );
                        }
                        return (
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
                        );
                      }}
                    >
                      {buttonText()}
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
                    title={(props) => (
                      <Text {...props}>
                        Event Code:{" "}
                        <Text style={{ color: theme["color-primary-default"] }}>
                          {event.eventCode}
                        </Text>
                      </Text>
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
                  <Layout
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
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
                {!myData.loading && myData.data?.me.id === event.owner.id && (
                  <>
                    <Divider />
                    <Layout style={styles.contentButtons}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("CreateEvent", { id: event.id })
                        }
                      >
                        <View style={styles.circle}>
                          <Icon
                            height={32}
                            width={32}
                            fill="#3BCE33"
                            name="edit-2"
                          />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={styles.circle}>
                          <Icon
                            height={32}
                            width={32}
                            fill={theme["color-danger-default"]}
                            name="trash"
                          />
                        </View>
                      </TouchableOpacity>
                    </Layout>
                  </>
                )}
              </Layout>
            </ScrollView>
          </Layout>
        </Layout>
        <Modal
          backdropStyle={styles.backdrop}
          visible={modalVisible}
          onBackdropPress={()=>setModalVisible(false)}>
          <Card header={(props)=>(
            <View {...props}>
              <Text category='h5' style={{fontWeight: "bold"}}>
                Delete Event
              </Text>
            </View>
          )}
            footer={(props)=>(
              <View {...props} style={styles.buttonContainer}>
                <Button
                  status='basic'
                  onPress={()=>setModalVisible(false)}>
                  Cancel
                </Button>
                <Button
                  status='danger'
                  onPress={()=>deleteEventHandler()}>
                  DELETE
                </Button>
              </View>
            )}>
            <Text>WARNING: Are you sure?</Text>
            <Text>This action is irreversible!</Text>
          </Card>
        </Modal>
      </SafeAreaView>
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
  contentButtons: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  buttonContainer: {
    marginHorizontal: 0,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default EventScreen;
