import React, { useState, useEffect } from "react";
import {
  Layout,
  Text,
  Input,
  Icon,
  IconProps,
  Button,
} from "@ui-kitten/components";
import { StyleSheet, ScrollView, Image } from "react-native";
import { TransparentBackHeader } from "../components/common";
import { useLazyQuery } from "@apollo/react-hooks";
import {
  searchEventByCode,
  SearchEventCodeData,
  SearchEventCodeVariables,
} from "../graphql/queries";
import { useError, CustomError } from "../hooks";
import { Loading } from "../components/common";
import { JoinEventScreenNavigationProp } from "../navigation/types";

type Props = JoinEventScreenNavigationProp;

const AlertIcon = (props: IconProps) => (
  <Icon {...props} name="alert-circle-outline" />
);

const SearchIcon = (props: IconProps) => (
  <Icon {...props} name="search-outline" />
);
const JoinEventScreen: React.FC<Props> = ({ navigation }) => {
  const [eventCode, setEventCode] = useState<string>("");

  const [searchEvent, { loading, data }] = useLazyQuery<
    { searchEvent: SearchEventCodeData },
    SearchEventCodeVariables
  >(searchEventByCode, { fetchPolicy: "network-only" });

  const { Error, inputError, clearError, setCustomError } = useError();

  useEffect(() => {
    if (data) {
      if (data.searchEvent.length === 0) {
        setCustomError(new CustomError("No such event found", ["eventCode"]));
      } else {
        const id = data.searchEvent[0];
        navigation.navigate("EventPage", id);
      }
    }
  }, [data]);
  const onSubmit = () => {
    if (eventCode.length === 0) {
      setCustomError(
        new CustomError("Please enter an event code", ["eventCode"])
      );
      return;
    }
    searchEvent({ variables: { eventCode } });
  };
  console.log(data);
  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Loading visible={loading} />
        <TransparentBackHeader />
        <Layout style={styles.body}>
          <Text style={styles.header} status="primary" category="h2">
            Join an event with the event code!
          </Text>
          <Error />
          <Input
            status={inputError.eventCode ? "danger" : "basic"}
            onChange={clearError}
            onSubmitEditing={onSubmit}
            autoCorrect={false}
            autoCapitalize="characters"
            label="Event code"
            placeholder="Enter event code"
            accessoryRight={SearchIcon}
            caption="A 6 digit code present at all events"
            captionIcon={AlertIcon}
            value={eventCode}
            onChangeText={setEventCode}
          />
          <Button onPress={onSubmit} appearance="outline" style={styles.button}>
            Search
          </Button>
        </Layout>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={require("../../assets/fun.png")}
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  body: {
    paddingTop: 75,
    paddingHorizontal: 40,
  },
  header: {
    textAlign: "center",
    marginVertical: 30,
  },
  button: {
    alignSelf: "stretch",
    marginVertical: 20,
  },
  image: {
    height: "35%",
    width: "100%",
    alignSelf: "center",
    marginVertical: 30,
  },
});

export default JoinEventScreen;
