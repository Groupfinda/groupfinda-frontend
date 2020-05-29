import React from "react";
import { Layout, Text, Icon, Button } from "@ui-kitten/components";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FormProps } from "./types";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import Carousel from "../../common/Carousel";
import ImageCard from "../../common/Carousel/ImageCard";

const imageLink = require("../../../../assets/sampleimage1.jpg");

const EventImagesForm: React.FC<FormProps> = (props) => {
  const { variables, modifyVariable, nextPage, prevPage } = props;
  const { dateOfEvent, dateLastRegister } = variables;

  const getPermissionsAsync = async () => {
    if (Constants.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  return (
    <Layout style={styles.container}>
      <Text style={styles.subheading} appearance="hint" category="h5">
        Upload images to decorate your listing!
      </Text>
      <Layout>
        <Carousel
          style={styles.carousel}
          imageHeight={250}
          items={["1", "2", "3"]}
        />
      </Layout>
      <Layout level="4" style={styles.addImageContainer}>
        <TouchableOpacity style={styles.wrapper}>
          <Icon fill="grey" style={styles.iconStyle} name="plus" />
        </TouchableOpacity>
      </Layout>
      <Layout style={styles.pageNav}>
        <Button onPress={prevPage}>Prev</Button>
        <Layout style={styles.spacer} />
        <Button onPress={nextPage}>Next</Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  subheading: {
    marginBottom: 20,
  },
  titleStyle: {
    marginBottom: 35,
  },
  container: {
    flex: 1,
  },
  iconStyle: {
    fontSize: 20,
    height: 32,
    width: 32,
  },
  carousel: {
    height: 400,
    borderWidth: 5,
  },

  addImageContainer: {
    width: "100%",
    height: 100,
    borderWidth: 5,
    borderStyle: "dashed",
    borderColor: "rgba(0,0,0,0.5)",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  pageNav: {
    flexDirection: "row",
    marginTop: 20,
  },
  spacer: {
    flex: 1,
  },
});
export default EventImagesForm;
