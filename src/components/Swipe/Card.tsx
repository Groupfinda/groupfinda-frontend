// @flow
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import { GetSwipeEventsType } from "../../graphql/queries";
import { Layout, Text, Icon, Divider } from "@ui-kitten/components";
import { getDateFormat } from "../util";

type CardProps = {
  event: GetSwipeEventsType;
  likeOpacity?: Animated.AnimatedInterpolation;
  nopeOpacity?: Animated.AnimatedInterpolation;
  registerOpacity?: Animated.AnimatedInterpolation;
  getInfo?: () => void;
};

const Card: React.FC<CardProps> = (props) => {
  const { event, likeOpacity, nopeOpacity, registerOpacity, getInfo } = props;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onRightArrow = () => {
    if (currentIndex === event.images.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };
  const onLeftArrow = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <Layout level="1" style={styles.container}>
      {event.images.map((image, index) => (
        <Image
          key={index}
          style={{
            ...styles.image,
            opacity: index === currentIndex ? 1 : 0,
          }}
          source={{ uri: image }}
        />
      ))}

      <View
        style={{
          position: "absolute",
          height: "75%",
          width: "100%",
          zIndex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={onLeftArrow} style={styles.touchable}>
          <View style={styles.arrows}>
            <Icon height={100} width={70} name="chevron-left-outline" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRightArrow} style={styles.touchable}>
          <View style={styles.arrows}>
            <Icon height={100} width={70} name="chevron-right-outline" />
          </View>
        </TouchableOpacity>
      </View>

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
          <View style={styles.bullets}>
            {event.images.map((_, index) => (
              <Text
                key={index}
                style={{
                  ...styles.bullet,
                  opacity: index === currentIndex ? 0.5 : 0.1,
                }}
              >
                &bull;
              </Text>
            ))}
          </View>
          <Text category="h5" status="primary">
            {event.title.slice(0, 50)} {event.title.length > 50 ? "..." : ""}
          </Text>
          <View style={styles.footerBody}>
            <View style={styles.footerText}>
              <View style={styles.footerWithIcon}>
                <Icon width={16} height={16} fill="black" name="edit" />
                <Text category="s2" style={styles.footerTextMargin}>
                  {event.description.slice(0, 100)}
                  {event.description.length > 100 ? "..." : ""}
                </Text>
              </View>

              <View style={styles.footerWithIcon}>
                <Icon
                  width={16}
                  height={16}
                  fill="black"
                  name="calendar-outline"
                />
                <Text style={styles.footerTextMargin} category="s2">
                  {getDateFormat(event.dateOfEvent)}
                </Text>
              </View>
              <View style={styles.footerWithIcon}>
                <Icon width={16} height={16} fill="black" name="compass" />
                <Text style={styles.footerTextMargin} category="s2">
                  {event.location.address}
                </Text>
              </View>
            </View>
            <Divider />

            <View style={styles.infoStyle}>
              <TouchableOpacity onPress={getInfo}>
                <Icon width={32} height={32} fill="grey" name="info-outline" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "75%",
    borderRadius: 20,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  touchable: {
    height: "75%",
    width: "15%",
    justifyContent: "center",
  },
  arrows: {
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
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
    flexDirection: "column",
    height: "25%",
    paddingTop: 10,
    justifyContent: "center",
  },
  footerText: {
    flex: 1,
    paddingRight: 20,
    borderRightWidth: 1,
  },
  footerBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerWithIcon: {
    flexDirection: "row",
    alignContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 1,
  },
  footerTextMargin: {
    marginLeft: 5,
    flexDirection: "column",
  },
  infoStyle: {
    flex: 0.2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
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
  bullets: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 20,
  },
});

export default Card;
