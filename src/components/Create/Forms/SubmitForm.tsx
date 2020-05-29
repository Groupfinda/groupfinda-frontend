import React, { useState } from "react";
import {
  Layout,
  Text,
  Toggle,
  Button,
  Icon,
  Tooltip,
} from "@ui-kitten/components";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { FormProps } from "./types";

const SubmitForm: React.FC<FormProps> = (props) => {
  const { variables, modifyVariable, prevPage } = props;
  const [tooltip, setTooltip] = useState<boolean>(false);
  const {
    title,
    description,
    dateOfEvent,
    dateLastRegister,
    groupSize,
    category,
    privateStatus,
  } = variables;

  const renderInfoIcon = () => (
    <TouchableWithoutFeedback onPress={() => setTooltip(true)}>
      <Icon style={styles.icon} name="question-mark-circle-outline" />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container}>
      <Layout style={styles.section}>
        <Text style={styles.subheading} appearance="hint" category="h5">
          Check the details of your event
        </Text>
        <Layout level="2" style={styles.detail}>
          <Text category="label">Title</Text>
          <Text category="h6">{title}</Text>
        </Layout>
        <Layout level="2" style={styles.detail}>
          <Text category="label">Description</Text>
          <Text category="s1">{description}</Text>
        </Layout>
        <Layout level="2" style={styles.detail}>
          <Text category="label">Images</Text>
        </Layout>
        <Layout level="2" style={styles.detail}>
          <Text category="label">Date of event</Text>
          <Text category="h6">{dateOfEvent.toLocaleDateString()}</Text>
        </Layout>
        <Layout level="2" style={styles.detail}>
          <Text category="label">Last register date</Text>
          <Text category="h6">{dateLastRegister.toLocaleDateString()}</Text>
        </Layout>
        <Layout level="2" style={styles.detail}>
          <Text category="label">Group size</Text>
          <Text category="h6">{groupSize}</Text>
        </Layout>
        <Layout level="2" style={styles.detail}>
          <Text category="label">Categories</Text>
          <Text category="h6">{category.join(" | ")}</Text>
        </Layout>
        <Layout style={styles.toggle}>
          <Toggle
            status="primary"
            checked={!privateStatus}
            onChange={(checked) => modifyVariable("privateStatus")(!checked)}
          >
            Public
          </Toggle>
          <Tooltip
            anchor={renderInfoIcon}
            visible={tooltip}
            onBackdropPress={() => setTooltip(false)}
          >
            {
              "Makes your event publicly searchable!\nOnly available for registered event hosts"
            }
          </Tooltip>
        </Layout>
      </Layout>
      <Layout style={styles.pageNav}>
        <Button onPress={prevPage}>Prev</Button>
        <Layout style={styles.spacer} />
        <Button onPress={() => console.log(variables)} status="warning">
          Submit
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  subheading: {
    marginBottom: 20,
  },
  icon: {
    height: 20,
    width: 20,
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
  detail: {
    marginVertical: 10,
    minHeight: 40,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SubmitForm;
