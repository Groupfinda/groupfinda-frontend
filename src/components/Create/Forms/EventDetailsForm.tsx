import React from "react";
import { Layout, Text, Button, Input, Icon } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { FormProps } from "./types";
import { useError, CustomError } from "../../../hooks";
import { ReferencesType } from "../../types";

const EventDetailsForm: React.FC<FormProps> = (props) => {
  const references: ReferencesType = {};
  const { variables, modifyVariable } = props;
  const { title, description } = variables;
  const { Error, setCustomError, inputError, resetInputError } = useError();

  const validateTitle = () => {
    if (title.length === 0) {
      setCustomError(new CustomError("Title must not be empty", ["title"]));
    } else {
      setCustomError(new CustomError("", []));
    }
  };

  const validateDescription = () => {
    if (description.length === 0) {
      setCustomError(
        new CustomError("Description must not be empty", ["description"])
      );
    } else {
      setCustomError(new CustomError("", []));
    }
  };

  return (
    <Layout>
      <Text style={styles.subheading} appearance="hint" category="h5">
        Tell us more about your event.
      </Text>
      <Error />
      <Input
        status={inputError.title ? "danger" : "basic"}
        onChange={() => resetInputError("title")}
        onSubmitEditing={() => references.secondInput?.focus()}
        blurOnSubmit={false}
        autoCorrect={false}
        autoCapitalize="none"
        label="Title"
        placeholder="Event title"
        caption="Write something to attract new participants"
        style={styles.titleStyle}
        value={title}
        onChangeText={modifyVariable("title")}
        onBlur={validateTitle}
      />
      <Input
        ref={(ref) => {
          references.secondInput = ref;
        }}
        status={inputError.description ? "danger" : "basic"}
        onChange={() => resetInputError("description")}
        autoCorrect={false}
        autoCapitalize="none"
        label="Description"
        placeholder="Enter a description for your event"
        caption="Let people know what your event is about"
        multiline={true}
        textStyle={{ minHeight: 100 }}
        value={description}
        onChangeText={modifyVariable("description")}
        onBlur={validateDescription}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  subheading: {
    marginBottom: 20,
  },
  titleStyle: {
    marginBottom: 35,
    marginTop: 10,
  },
});

export default EventDetailsForm;
