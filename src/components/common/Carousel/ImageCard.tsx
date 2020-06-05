import React from "react";

import { Image, StyleSheet, ImageSourcePropType } from "react-native";

type Props = {
  imageLink?: string;
  height: number;
};
const ImageCard: React.FC<Props> = (props) => {
  return (
    <Image
      style={styles.image}
      resizeMethod="auto"
      resizeMode="contain"
      height={props.height}
      source={{ uri: props.imageLink }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    maxWidth: "100%",
    width: "100%",
  },
});

export default ImageCard;
