import React, { useEffect, useState, useRef } from "react";
import { Animated, ScrollView, View, TouchableOpacity } from "react-native";
import {
  Layout,
  Text,
  StyleService,
  Divider,
  useStyleSheet,
  useTheme,
  Icon,
  Avatar,
  ListItem,
} from "@ui-kitten/components";
import Carousel from "../../components/common/Carousel";
import { LinearGradient } from "expo-linear-gradient";
import { GetSwipeEventsType } from "../../graphql/queries";

type CardInfoProps = {
  visible: boolean;
  close: (action?: string) => void;
  event: GetSwipeEventsType;
};
const CardInfo: React.FC<CardInfoProps> = (props) => {
  const { visible, close, event } = props;
  const [isVisible, setIsVisible] = useState<boolean>(visible);
  const visibility = useRef(new Animated.Value(0)).current;

  /**
   * Animations
   */
  useEffect(() => {
    if (visible) {
      setIsVisible(visible);
    }
    Animated.timing(visibility, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(visible);
    });
  }, [visible]);

  const infoStyle = {
    opacity: visibility.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        scale: visibility.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
  };
  /**
   * Animations
   */
  const theme = useTheme();
  const styles = useStyleSheet(themedStyle);
  const dateOfEvent = new Date(event["dateOfEvent"]);
  const dateLastRegister = new Date(event["dateLastRegister"]);
  if (!isVisible) return <></>;
  return (
    <Animated.ScrollView
      style={
        isVisible ? [styles.containerStyle, infoStyle] : styles.containerStyle
      }
    >
      <Layout>
        <Layout style={styles.headerLayout}>
          <Layout level="1" style={{ backgroundColor: "transparent" }}>
            <TouchableOpacity onPress={() => close()}>
              <Icon height={30} width={30} fill="white" name="close-outline" />
            </TouchableOpacity>
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
                  Created by {event.owner.username}
                  <Avatar size="tiny" source={{ uri: event.owner.avatar }} />
                  {/*  ({event.owner.firstName} {event.owner.lastName}) */}
                </Text>
                <Layout
                  style={{
                    marginTop: 15,
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                ></Layout>
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
              <Layout style={styles.contentButtons}>
                <TouchableOpacity onPress={() => close("NOPE")}>
                  <View style={styles.circle}>
                    <Icon
                      height={32}
                      width={32}
                      fill={theme["color-danger-default"]}
                      name="close"
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => close("REGISTER")}>
                  <View style={styles.circle}>
                    <Icon
                      height={32}
                      width={32}
                      fill={theme["color-primary-default"]}
                      name="star"
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => close("LIKE")}>
                  <View style={styles.circle}>
                    <Icon
                      height={32}
                      width={32}
                      fill={theme["color-success-default"]}
                      name="heart"
                    />
                  </View>
                </TouchableOpacity>
              </Layout>
            </Layout>
          </ScrollView>
        </Layout>
      </Layout>
    </Animated.ScrollView>
  );
};

const themedStyle = StyleService.create({
  containerStyle: {
    flex: 1,
    zIndex: 1,
    borderRadius: 20,
  },
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
});
export default CardInfo;
