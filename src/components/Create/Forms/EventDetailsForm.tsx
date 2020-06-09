import React from "react";
import { Layout, Text, Button, Input } from "@ui-kitten/components";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { FormPropsWithValidate } from "./types";
import { useError } from "../../../hooks";
import { ReferencesType } from "../../types";

const EventDetailsForm: React.FC<FormPropsWithValidate> = (props) => {
  const references: ReferencesType = {};
  const { variables, modifyVariable, nextPage, validateFieldLength } = props;
  const { title, description } = variables;
  const { Error, setCustomError, inputError, resetInputError } = useError();

  const validateTitle = validateFieldLength("title")(setCustomError);
  const validateDescription = validateFieldLength("description")(
    setCustomError
  );

  const onNext = () => {
    if (!validateTitle()) return;
    if (!validateDescription()) return;
    if (nextPage) nextPage();
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={40}
      style={styles.container}
      behavior="padding"
    >
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
          onSubmitEditing={onNext}
        />
      </Layout>
      <Layout style={styles.pageNav}>
        <Layout style={styles.spacer} />
        <Button onPress={onNext}>Next</Button>
      </Layout>
    </KeyboardAvoidingView>
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
  container: {
    flex: 1,
  },
  pageNav: {
    flexDirection: "row",
    marginTop: 20,
  },
  spacer: {
    flex: 1,
  },
});

export default EventDetailsForm;
