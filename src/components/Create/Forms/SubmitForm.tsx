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
import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_EVENT,
  CreateEventData,
  CreateEventVariables,
} from "../../../graphql/mutations";
import { useError } from "../../../hooks";
import { Loading } from "../../common";
import { useNavigation } from "@react-navigation/native";
import Carousel from "../../common/Carousel";

function InfoField(props: {
  text: string;
  category?: string;
  label: string;
  error?: boolean;
}) {
  const { text, category, label, error } = props;
  return (
    <Layout level="2" style={styles.detail}>
      <Text status={error ? "danger" : "primary"} category="label">
        {label}
      </Text>
      <Text category={category ? category : "h6"}>{text}</Text>
    </Layout>
  );
}

type Props = {
  role: string;
};

type SubmitFormProps = Props & FormProps;
const SubmitForm: React.FC<SubmitFormProps> = (props) => {
  const { variables, modifyVariable, prevPage, role } = props;
  const [tooltip, setTooltip] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    title,
    description,
    dateOfEvent,
    dateLastRegister,
    groupSize,
    recurringMode,
    images,
    category,
    privateStatus,
    locationOn,
    address,
    postalCode,
  } = variables;
  const { Error, setGraphQLError, inputError } = useError();
  const navigation = useNavigation();
  const [createEvent] = useMutation<
    { createEvent: CreateEventData },
    CreateEventVariables
  >(CREATE_EVENT, {
    onError: (err) => {
      setGraphQLError(err);
      setLoading(false);
    },
    onCompleted: (data) => {
      setLoading(false);
      navigation.reset({
        index: 1,
        routes: [
          { name: "Main" },
          { name: "EventPage", params: { id: data.createEvent.id } },
        ],
      });
    },
  });

  const renderInfoIcon = () => (
    <TouchableWithoutFeedback onPress={() => setTooltip(true)}>
      <Icon style={styles.icon} name="question-mark-circle-outline" />
    </TouchableWithoutFeedback>
  );

  const onSubmit = async () => {
    console.log(variables);
    setLoading(true);
    const mutationVariables: CreateEventVariables = {
      title,
      description,
      dateOfEvent,
      dateLastRegister,
      recurringMode,
      images: images.map((image) => image.slice(image.length - 15)),
      private: privateStatus,
      groupSize,
      category,
      locationOn,
      location: {
        address,
        postalCode,
      },
    };
    try {
      await createEvent({ variables: mutationVariables });
    } catch {
      setLoading(false);
    }
  };
  return (
    <Layout style={styles.container}>
      <Loading visible={loading} />
      <Layout style={styles.section}>
        <Text style={styles.subheading} appearance="hint" category="h5">
          Check the details of your event
        </Text>
        <InfoField text={title} label="Title" error={inputError.title} />
        <InfoField
          text={description}
          label="Description"
          category="s1"
          error={inputError.description}
        />
        <InfoField
          text={dateOfEvent.toLocaleDateString()}
          label="Date of event"
          error={inputError.dateOfEvent}
        />
        <InfoField
          text={dateLastRegister.toLocaleDateString()}
          label="Last day to register"
          error={inputError.dateLastRegister}
        />
        <InfoField text={address} label="Address" error={inputError.address} />
        <InfoField
          text={postalCode}
          label="Postal Code"
          error={inputError.postalCode}
        />

        <InfoField text="" label="Images" error={inputError.title} />
        <Carousel items={images} imageHeight={250} />

        <InfoField
          text={groupSize.toString()}
          label="Group size"
          error={inputError.groupSize}
        />

        <InfoField
          text={category.join(" | ")}
          label="Categories"
          error={inputError.category}
        />

        <Layout style={styles.toggle}>
          <Toggle
            disabled={role === "USER"}
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
        <Error />
      </Layout>
      <Layout style={styles.pageNav}>
        <Button onPress={prevPage}>Prev</Button>
        <Layout style={styles.spacer} />
        <Button onPress={onSubmit} status="warning">
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
