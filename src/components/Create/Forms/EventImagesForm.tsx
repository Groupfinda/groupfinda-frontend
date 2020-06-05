import React, { useState, useEffect } from "react";
import { Layout, Text, Icon, Button, ViewPager } from "@ui-kitten/components";
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from "react-native";
import { FormProps } from "./types";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import ImageCard from "../../common/Carousel/ImageCard";
import { useMutation } from "@apollo/react-hooks";
import {
  GET_PRESIGNED_URL,
  GetPresignedUrlData,
  GetPresignedUrlVariables,
} from "../../../graphql/mutations";

const defaultImage = [
  "https://groupfinda.s3-ap-southeast-1.amazonaws.com/fun.png",
];
const EventImagesForm: React.FC<FormProps> = (props) => {
  const { variables, modifyVariable, nextPage, prevPage } = props;
  const { images } = variables;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [displayImages, setDisplayImages] = useState<string[]>([]);

  const uploadImage = async (url: GetPresignedUrlData, uri: string) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      Object.keys(url.getPresignedURL.fields).forEach((key) => {
        formData.append(key, url.getPresignedURL.fields[key]);
      });
      //@ts-ignore
      formData.append("file", { uri: uri, type: "image" });

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url.getPresignedURL.url, true);
      xhr.send(formData);
      xhr.onload = () => {
        xhr.status === 204 ? resolve() : reject(xhr.responseText);
      };
    });
  };

  const [getPresigned] = useMutation<
    GetPresignedUrlData,
    GetPresignedUrlVariables
  >(GET_PRESIGNED_URL, {
    onCompleted: async (data) => {
      try {
        await uploadImage(data, images[images.length - 1]);
      } catch (err) {
        alert(err);
      }
    },
  });

  useEffect(() => {
    if (images.length > 0) {
      setDisplayImages(images);
    } else setDisplayImages(defaultImage);
  }, [images]);

  const showAlert = () => {
    Alert.alert(
      "Please allow access",
      [
        "This applicaton needs access to your photo library to upload images.",
        "\n\n",
        "Please go to Settings of your device and grant permissions to Photos.",
      ].join(""),
      [
        { text: "Not Now", style: "cancel" },
        { text: "Settings", onPress: () => Linking.openURL("app-settings:") },
      ]
    );
  };

  const getPermissionsAsync = async () => {
    if (Constants.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        if (Platform.OS === "ios") showAlert();
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
        });

        if (!result.cancelled) {
          modifyVariable("images")([...images, result.uri]);

          await getPresigned({
            variables: { key: result.uri.slice(result.uri.length - 15) },
          });
        }
      }
    }
  };

  return (
    <Layout style={styles.container}>
      <Text style={styles.subheading} appearance="hint" category="h5">
        Upload images to decorate your listing!
      </Text>
      <Layout>
        <Layout style={styles.bullets}>
          {displayImages.map((_, i) => (
            <Text
              key={i}
              style={{
                ...styles.bullet,
                opacity: selectedIndex === i ? 0.8 : 0.3,
              }}
            >
              &bull;
            </Text>
          ))}
        </Layout>
        <ViewPager
          style={{ height: 250 }}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        >
          {displayImages.map((image) => (
            <ImageCard key={image} height={250} imageLink={image} />
          ))}
        </ViewPager>
      </Layout>
      <Layout level="4" style={styles.addImageContainer}>
        <TouchableOpacity onPress={getPermissionsAsync} style={styles.wrapper}>
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
  bullets: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 5,
    zIndex: 100,
    backgroundColor: "transparent",
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 20,
  },
});
export default EventImagesForm;
