// @flow
import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { EventType } from "./event";

type CardProps = {
  event: EventType;
  likeOpacity?: Animated.Node<number>;
  nopeOpacity?: Animated.Node<number>;
  registerOpacity?: Animated.Node<number>;
};
const Card: React.FC<CardProps> = (props) => {
  const { event, likeOpacity, nopeOpacity, registerOpacity } = props;
  return (
    <View style={StyleSheet.absoluteFill}>
      <Image style={styles.image} source={event.image} />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Animated.View
            style={(styles.like, { opacity: likeOpacity ? likeOpacity : 0 })}
          >
            <Text style={styles.likeLabel}>LIKE</Text>
          </Animated.View>
          <Animated.View
            style={(styles.nope, { opacity: nopeOpacity ? nopeOpacity : 0 })}
          >
            <Text style={styles.nopeLabel}>NOPE</Text>
          </Animated.View>
        </View>
        <View style={styles.middle}>
          <Animated.View
            style={
              (styles.register,
              { opacity: registerOpacity ? registerOpacity : 0 })
            }
          >
            <Text style={styles.registerLabel}>REGISTER</Text>
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.title}>{event.title}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  middle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
  },
  title: {
    color: "white",
    fontSize: 32,
  },
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#6ee3b4",
  },
  likeLabel: {
    fontSize: 32,
    color: "#6ee3b4",
    fontWeight: "bold",
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#ec5288",
  },
  nopeLabel: {
    fontSize: 32,
    color: "#ec5288",
    fontWeight: "bold",
  },
  register: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#3DB5F4",
  },
  registerLabel: {
    fontSize: 32,
    color: "#3DB5F4",
    fontWeight: "bold",
  },
});

export default Card;
