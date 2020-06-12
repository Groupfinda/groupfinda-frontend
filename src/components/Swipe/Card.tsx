// @flow
import * as React from "react";
import { Image, StyleSheet, View, Text, Animated } from "react-native";
import { EventType } from "./event";
import { Layout } from "@ui-kitten/components";

type CardProps = {
  event: EventType;
  likeOpacity?: Animated.AnimatedInterpolation;
  nopeOpacity?: Animated.AnimatedInterpolation;
  registerOpacity?: Animated.AnimatedInterpolation;
};
const Card: React.FC<CardProps> = (props) => {
  const { event, likeOpacity, nopeOpacity, registerOpacity } = props;
  return (
    <Layout level="2" style={styles.container}>
      <Image style={styles.image} source={{ uri: event.image }} />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Animated.View
            style={[styles.like, { opacity: likeOpacity ? likeOpacity : 0 }]}
          >
            <Text style={styles.likeLabel}>LIKE</Text>
          </Animated.View>
          <Animated.View
            style={[styles.nope, { opacity: nopeOpacity ? nopeOpacity : 0 }]}
          >
            <Text style={styles.nopeLabel}>NOPE</Text>
          </Animated.View>
        </View>
        <View style={styles.middle}>
          <Animated.View
            style={[
              styles.register,
              { opacity: registerOpacity ? registerOpacity : 0 },
            ]}
          >
            <Text style={styles.registerLabel}>REGISTER</Text>
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.title}>{event.title}</Text>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "80%",
    borderRadius: 20,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
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

    height: "20%",
    paddingTop: 10,
  },
  title: {
    color: "black",
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
