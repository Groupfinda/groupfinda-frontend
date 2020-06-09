import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, View, Dimensions } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import type { EventType } from "./event";
import Card from "./Card";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  clockRunning,
  startClock,
  stopClock,
  Clock,
  and,
} from "react-native-reanimated";
import { valueFromAST } from "graphql";

const {
  event,
  Value,
  interpolate,
  concat,
  cond,
  eq,
  set,
  spring,
  greaterThan,
  lessThan,
} = Animated;
type CardStackProps = {
  events: EventType[];
};
function runSpring(clock, value, velocity, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}
const { width, height } = Dimensions.get("window");
const rotatedWidth =
  width * Math.sin((75 * Math.PI) / 180) +
  height * Math.sin((15 * Math.PI) / 180);

const CardStack: React.FC<CardStackProps> = (props) => {
  const [events, setEvents] = useState<EventType[]>(props.events);

  const [lastEvent, ...eventsLeft] = events;

  const translationX = useRef(new Value(0));
  const translationY = useRef(new Value(0));
  const velocityX = useRef(new Value(0));
  const gestureState = useRef(new Value(State.UNDETERMINED));

  const onPanGestureEvent = event(
    [
      {
        nativeEvent: {
          translationX: translationX.current,
          translationY: translationY.current,
          velocityX: velocityX.current,
          state: gestureState.current,
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  const snapPoint = cond(
    and(lessThan(translationX.current, 0), lessThan(velocityX.current, -10)),
    -width,
    cond(
      and(
        greaterThan(translationX.current, 0),
        greaterThan(velocityX.current, 10)
      ),
      width,
      0
    )
  );

  const clockX = new Clock();

  const translateX = cond(
    eq(gestureState.current, State.END),
    [
      set(
        translationX.current,
        runSpring(clockX, translationX.current, velocityX.current, snapPoint)
      ),
      translationX.current,
    ],
    translationX.current
  );

  const clockY = new Clock();
  const translateY = cond(
    eq(gestureState.current, State.END),
    [
      set(translationY.current, runSpring(clockY, translationY.current, 0, 0)),
      translationY.current,
    ],
    translationY.current
  );

  const likeOpacity = interpolate(translateX, {
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const nopeOpacity = interpolate(translateX, {
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const registerOpacity = interpolate(translateY, {
    inputRange: [-height / 4, 0],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const rotateZ = concat(
    interpolate(translateX, {
      inputRange: [-width / 2, width / 2],
      outputRange: [15, -15],
      extrapolate: Extrapolate.CLAMP,
    }),
    "deg"
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cards}>
        {eventsLeft.reverse().map((event) => (
          <Card key={event.id} {...{ event }} />
        ))}
        <PanGestureHandler
          onHandlerStateChange={onPanGestureEvent}
          onGestureEvent={onPanGestureEvent}
        >
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              transform: [
                {
                  translateX: translationX.current,
                },
                { translateY: translationY.current },
                { rotateZ },
              ],
            }}
          >
            <Card
              event={lastEvent}
              nopeOpacity={nopeOpacity}
              likeOpacity={likeOpacity}
              registerOpacity={registerOpacity}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
      <View style={styles.footer}>
        <View style={styles.circle}>
          <Icon name="x" size={32} color="#ec5288" />
        </View>
        <View style={styles.circle}>
          <Icon name="heart" size={32} color="#3DB5F4" />
        </View>
        <View style={styles.circle}>
          <Icon name="check" size={32} color="#6ee3b4" />
        </View>
      </View>
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
    flex: 1,
    margin: 8,
    zIndex: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
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
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});

export default CardStack;
