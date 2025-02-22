import React, { useState } from "react";
import {
  Layout,
  Text,
  Datepicker,
  Icon,
  IconProps,
  Button,
} from "@ui-kitten/components";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { StyleSheet, Platform } from "react-native";
import { FormProps } from "./types";
import { getDateFormat } from "../../util";

const CalendarIcon = (props: IconProps) => <Icon {...props} name="calendar" />;
const EventDateForm: React.FC<FormProps> = (props) => {
  const { variables, modifyVariable, nextPage, prevPage } = props;
  const { dateOfEvent, dateLastRegister } = variables;
  const [selectTime, setSelectTime] = useState<boolean>(false);

  const onSelectTime = (event: Event, selectedDate?: Date) => {
    console.log(event);
    if (Platform.OS === "ios") {
      const finalDate = selectedDate ? selectedDate : dateOfEvent;

      modifyVariable("dateOfEvent")(finalDate);
    } else {
      if (event.type === "set") {
        setSelectTime(false);
        const finalDate = selectedDate ? selectedDate : dateOfEvent;
        modifyVariable("dateOfEvent")(finalDate);
      }
    }
  };

  const onSelectDate = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(dateOfEvent.getHours());
    newDate.setMinutes(dateOfEvent.getMinutes());

    modifyVariable("dateOfEvent")(newDate);
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.section}>
        <Text style={styles.subheading} appearance="hint" category="h5">
          When is this event taking place?
        </Text>
        <Text category="h6" appearance="hint" style={styles.datepicker}>
          {getDateFormat(dateOfEvent)}
        </Text>

        <Datepicker
          label="Date of Event"
          caption="This is the actual day of your event"
          placeholder="Pick a date!"
          date={dateOfEvent}
          onSelect={onSelectDate}
          min={new Date()}
          accessoryRight={CalendarIcon}
          style={styles.datepicker}
        />
        <Button
          appearance="outline"
          onPress={() => setSelectTime((prev) => !prev)}
        >
          Set Time!
        </Button>
        {selectTime && (
          <DateTimePicker
            mode="time"
            value={dateOfEvent}
            onChange={onSelectTime}
            neutralButtonLabel="clear"
          />
        )}
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
  datepicker: {
    marginBottom: 10,
  },
});
export default EventDateForm;
