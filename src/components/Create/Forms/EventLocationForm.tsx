import React from "react";
import {
  Layout,
  Text,
  Input,
  Icon,
  IconProps,
  Button,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { FormPropsWithValidate } from "./types";
import { useError } from "../../../hooks";
import { ReferencesType } from "../../types";

const EventLocationForm: React.FC<FormPropsWithValidate> = (props) => {
  const references: ReferencesType = {};
  const {
    variables,
    modifyVariable,
    nextPage,
    prevPage,
    validateFieldLength,
  } = props;
  const { address, postalCode } = variables;
  const { Error, setCustomError, inputError, resetInputError } = useError();

  const validateAddress = validateFieldLength("address")(setCustomError);
  const validatePostalCode = validateFieldLength("postalCode")(setCustomError);

  const onNext = () => {
    if (!validateAddress()) return;
    if (!validatePostalCode()) return;
    if (nextPage) nextPage();
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.section}>
        <Text style={styles.subheading} appearance="hint" category="h5">
          Where is this event taking place?
        </Text>
        <Error />
        <Input
          status={inputError.address ? "danger" : "basic"}
          onChange={() => resetInputError("address")}
          onSubmitEditing={() => references.secondInput?.focus()}
          blurOnSubmit={false}
          autoCorrect={false}
          autoCapitalize="none"
          label="Address"
          placeholder="Address of event"
          caption="Let users know where your event is taking place"
          style={styles.titleStyle}
          value={address}
          onChangeText={modifyVariable("address")}
          onBlur={validateAddress}
        />
        <Input
          ref={(ref) => {
            references.secondInput = ref;
          }}
          status={inputError.description ? "danger" : "basic"}
          onChange={() => resetInputError("postalCode")}
          autoCorrect={false}
          autoCapitalize="none"
          label="Postal Code"
          placeholder="Enter postal code"
          value={postalCode}
          onChangeText={modifyVariable("postalCode")}
          onBlur={validatePostalCode}
          onSubmitEditing={onNext}
        />
      </Layout>

      <Layout style={styles.pageNav}>
        <Button onPress={prevPage}>Prev</Button>
        <Layout style={styles.spacer} />
        <Button onPress={onNext}>Next</Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  subheading: {
    marginBottom: 20,
  },
  titleStyle: {
    marginTop: 10,
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
export default EventLocationForm;
