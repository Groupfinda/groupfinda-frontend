import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  Alert,
} from "react-native";

import Card from "./Card";
import {
  GET_SWIPE_EVENTS,
  GetSwipeEventsData,
  GetSwipeEventsVariables,
  GetSwipeEventsType,
} from "../../graphql/queries";
import {
  VIEW_EVENT,
  ViewEventData,
  ViewEventVariables,
  REGISTER_EVENT,
  RegisterEventData,
  RegisterEventVariables,
} from "../../graphql/mutations";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";

import CardInfo from "./CardInfo";
import { ApolloError } from "apollo-boost";
import { Loading } from "../common";
import { Layout, Text, Button } from "@ui-kitten/components";

type CardStackProps = {};

const { width, height } = Dimensions.get("window");

const handleError = (err: ApolloError) => {
  Alert.alert(err.message);
};

const CardStack: React.FC<CardStackProps> = (props) => {
  const [getSwipeEvents, { data, loading, error }] = useLazyQuery<
    GetSwipeEventsData,
    GetSwipeEventsVariables
  >(GET_SWIPE_EVENTS, {
    fetchPolicy: "network-only",
  });
  const [registerEvent] = useMutation<
    RegisterEventData,
    RegisterEventVariables
  >(REGISTER_EVENT, {
    onError: handleError,
  });
  const [viewEvent] = useMutation<ViewEventData, ViewEventVariables>(
    VIEW_EVENT,
    { onError: handleError }
  );
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [events, setEvents] = useState<GetSwipeEventsType[]>([]);
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    if (events.length === 0) {
      getSwipeEvents();
    }
  }, [events]);

  useEffect(() => {
    if (data && data.getSwipeEvents.length !== 0) {
      setEvents(data.getSwipeEvents);
    }
  }, [data]);

  const likeEvent = async () => {
    await viewEvent({
      variables: { eventId: events[events.length - 1].id, type: "LIKE" },
    });
  };
  const dislikeEvent = async () => {
    await viewEvent({
      variables: { eventId: events[events.length - 1].id, type: "DISLIKE" },
    });
  };
  const registerForEvent = async () => {
    await registerEvent({
      variables: { eventId: events[events.length - 1].id },
    });
  };

  /**
   * Animations
   */
  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });
  const transformRotate = {
    transform: [
      {
        rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };

  const likeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0, width / 4],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });
  const nopeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0, width / 4],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });
  const registerOpacity = position.y.interpolate({
    inputRange: [-height / 4, 0, height / 4],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });
  const nextCardOpacityX = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0, 1],
    extrapolate: "clamp",
  });
  const nextCardOpacityY = position.y.interpolate({
    inputRange: [-height / 2, 0, height / 2],
    outputRange: [1, 0, 1],
    extrapolate: "clamp",
  });

  const animateMovement = (x: number, y: number, callback: () => void) => {
    Animated.spring(position, {
      toValue: { x, y },
      restDisplacementThreshold: 100,
      restSpeedThreshold: 100,
    }).start(() => {
      setEvents(events.slice(0, events.length - 1));
      position.setValue({ x: 0, y: 0 });
      callback();
    });
  };

  const nextCardOpacity = Animated.add(nextCardOpacityX, nextCardOpacityY);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > width / 3) {
        animateMovement(width + 50, gestureState.dy, likeEvent);
      } else if (gestureState.dx < -width / 3) {
        animateMovement(-width - 50, gestureState.dy, dislikeEvent);
      } else if (gestureState.dy < -height / 4) {
        animateMovement(gestureState.dx, -height, registerForEvent);
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
        }).start();
      }
    },
  });

  /**
   * Animations
   */

  const close = (action?: string) => {
    setShowInfo(false);
    switch (action) {
      case "LIKE":
        setTimeout(() => {
          animateMovement(width + 50, 0, likeEvent);
        }, 500);
        break;
      case "NOPE":
        setTimeout(() => {
          animateMovement(-width - 50, 0, dislikeEvent);
        }, 500);
        break;
      case "REGISTER":
        setTimeout(() => {
          animateMovement(0, -height, () => registerEvent);
        }, 500);
        break;
    }
  };

  if (error) {
    return (
      <Layout
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 30,
        }}
      >
        <Loading visible={loading} />
        <Text
          style={{ textAlign: "center", marginBottom: 30 }}
          category="h3"
          status="danger"
        >
          There seems to be a connection issue...
        </Text>
        <Button
          onPress={() => getSwipeEvents()}
          appearance="outline"
          status="warning"
        >
          Click here to refresh
        </Button>
      </Layout>
    );
  }

  if (data?.getSwipeEvents.length === 0) {
    return (
      <Layout
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 30,
        }}
      >
        <Loading visible={loading} />
        <Text
          style={{ textAlign: "center", marginBottom: 30 }}
          category="h3"
          status="primary"
        >
          You have already seen all the events we have {`:(`}
        </Text>
        <Button
          onPress={() => getSwipeEvents()}
          appearance="outline"
          status="warning"
        >
          Click here to refresh
        </Button>
      </Layout>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Loading visible={loading} />
      {events[events.length - 1] && (
        <CardInfo
          visible={showInfo}
          close={close}
          event={events[events.length - 1]}
        />
      )}

      {events.map((event, index) => {
        if (index === events.length - 1) {
          return (
            <Animated.View
              key={event.id}
              {...panResponder.panHandlers}
              style={[transformRotate, styles.cards]}
            >
              <Card
                likeOpacity={likeOpacity}
                nopeOpacity={nopeOpacity}
                registerOpacity={registerOpacity}
                key={event.id}
                event={event}
                getInfo={() => setShowInfo(true)}
              />
            </Animated.View>
          );
        } else if (index === events.length - 2) {
          return (
            <Animated.View
              key={event.id}
              style={[
                styles.cards,
                {
                  opacity: nextCardOpacity,
                },
              ]}
            >
              <Card key={event.id} event={event} />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={event.id}
              style={[styles.cards, { opacity: 0 }]}
            >
              <Card key={event.id} event={event} />
            </Animated.View>
          );
        }
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfaff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  cards: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    margin: 20,
  },
});

export default CardStack;
