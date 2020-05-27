import React from "react";
import {
  Layout,
  Text,
  Datepicker,
  Icon,
  IconProps,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { FormProps } from "./types";

const CalendarIcon = (props: IconProps) => <Icon {...props} name="calendar" />;
const EventDateForm: React.FC<FormProps> = (props) => {
  const { variables, modifyVariable } = props;
  const { dateOfEvent, dateLastRegister } = variables;
  return (
    <Layout style={styles.container}>
      <Layout>
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
      <Layout>
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
});
export default EventDateForm;
