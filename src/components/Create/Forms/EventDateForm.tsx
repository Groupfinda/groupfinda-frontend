import React from "react";
import {
  Layout,
  Text,
  Datepicker,
  Icon,
  IconProps,
  Button,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { FormProps } from "./types";

const CalendarIcon = (props: IconProps) => <Icon {...props} name="calendar" />;
const EventDateForm: React.FC<FormProps> = (props) => {
  const { variables, modifyVariable, nextPage, prevPage } = props;
  const { dateOfEvent, dateLastRegister } = variables;
  return (
    <Layout style={styles.container}>
      <Layout style={styles.section}>
        <Text style={styles.subheading} appearance="hint" category="h5">
          When is this event taking place?
        </Text>
        <Datepicker
          label="Date of Event"
          caption="This is the actual day of your event"
          placeholder="Pick a date!"
          date={dateOfEvent}
          onSelect={modifyVariable("dateOfEvent")}
          min={new Date()}
          accessoryRight={CalendarIcon}
        />
      </Layout>
      <Layout style={styles.section}>
        <Text style={styles.subheading} appearance="hint" category="h5">
          When is the last day for participants to be grouped up?
        </Text>
        <Datepicker
          label="Date of last register"
          caption="This is the last day for people to sign up"
          placeholder="Pick a date!"
          date={dateLastRegister}
          onSelect={modifyVariable("dateLastRegister")}
          min={new Date()}
          accessoryRight={CalendarIcon}
        />
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
    justifyContent: "space-around",
  },
  pageNav: {
    flexDirection: "row",
    marginTop: 20,
  },
  spacer: {
    flex: 1,
  },
  section: {
    marginVertical: 10,
  },
});
export default EventDateForm;
