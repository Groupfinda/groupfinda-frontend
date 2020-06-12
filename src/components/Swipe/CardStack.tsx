import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  PanResponder,
  Animated,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import type { EventType } from "./event";
import Card from "./Card";

type CardStackProps = {
  events: EventType[];
};

const { width, height } = Dimensions.get("window");

const CardStack: React.FC<CardStackProps> = (props) => {
  const [events, setEvents] = useState<EventType[]>(props.events);
  const position = new Animated.ValueXY();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (events.length === 0) {
      setEvents(props.events);
    }
  }, [events]);
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
  const nextCardOpacity = Animated.add(nextCardOpacityX, nextCardOpacityY);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > width / 3) {
        Animated.spring(position, {
          toValue: { x: width + 50, y: gestureState.dy },
          restDisplacementThreshold: 100,
          restSpeedThreshold: 100,
        }).start(() => {
          setEvents(events.slice(0, events.length - 1));
          position.setValue({ x: 0, y: 0 });
          console.log("yay");
        });
      } else if (gestureState.dx < -width / 3) {
        Animated.spring(position, {
          toValue: { x: -width - 50, y: gestureState.dy },
          restDisplacementThreshold: 100,
          restSpeedThreshold: 100,
        }).start(() => {
          setEvents(events.slice(0, events.length - 1));
          position.setValue({ x: 0, y: 0 });
          console.log("noo");
        });
      } else if (gestureState.dy < -height / 4) {
        Animated.spring(position, {
          toValue: { x: gestureState.dx, y: -height },
          restDisplacementThreshold: 100,
          restSpeedThreshold: 100,
        }).start(() => {
          setEvents(events.slice(0, events.length - 1));
          position.setValue({ x: 0, y: 0 });
          console.log("woohoo");
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
        }).start();
      }
    },
  });
  console.log(events.reverse());
  return (
    <SafeAreaView style={styles.container}>
      {events.reverse().map((event, index) => {
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
    margin: 8,
  },
});

export default CardStack;
