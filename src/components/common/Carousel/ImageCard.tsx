import React from "react";

import { Image, StyleSheet, ImageSourcePropType } from "react-native";

type Props = {
  imageLink: string;
  height: number;
};
const ImageCard: React.FC<Props> = (props) => {
  return (
    <Image
      style={styles.image}
      resizeMethod="scale"
      height={props.height}
      source={require("../../../../assets/sampleimage1.jpg")}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
  },
});

export default ImageCard;
