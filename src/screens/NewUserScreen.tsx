import React from "react";
import { NewUsersNavigationProp } from "../navigation/types";
import {
  ViewPager,
  Layout,
  StyleService,
  useStyleSheet,
  Text,
} from "@ui-kitten/components";
import { View } from "react-native";
import {
  QuestionsSlide,
  IntroSlide,
  FormSlide,
  EventSlide,
} from "../components/NewUser";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  ADD_EXPO_TOKEN,
  AddExpoTokenData,
  AddExpoTokenVariables,
} from "../graphql/mutations";
import { ME, MeData } from "../graphql/queries";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerForPushNotificationsAsync } from "../../utils/notification";

type Props = NewUsersNavigationProp;

const NewUserScreen: React.FC<Props> = ({ navigation }) => {
  const styles = useStyleSheet(themedStyle);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [numPages, setIntervals] = React.useState(4);

  let bullets = [];
  for (let i = 0; i < numPages; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: selectedIndex === i ? 0.7 : 0.1,
        }}
      >
        &bull;
      </Text>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ViewPager
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Layout style={styles.tab}>
          <IntroSlide />
        </Layout>
        <Layout style={styles.tab}>
          <EventSlide />
        </Layout>
        <Layout style={styles.tab}>
          <QuestionsSlide />
        </Layout>
        <Layout style={styles.tab}>
          <FormSlide />
        </Layout>
      </ViewPager>
      {selectedIndex !== 3 ? (
        <View style={styles.bullets}>{bullets}</View>
      ) : null}
    </SafeAreaView>
  );
};

const themedStyle = StyleService.create({
  tab: {
    flex: 1,
    height: "100%",
  },
  bullets: {
    position: "absolute",
    bottom: 32,
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 30,
  },
});

export default NewUserScreen;
