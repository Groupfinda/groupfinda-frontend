import React, { useState } from "react";
import { Layout } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import EventDetailsForm from "./EventDetailsForm";
import EventDateForm from "./EventDateForm";
import EventLocationForm from "./EventLocationForm";
import EventImagesForm from "./EventImagesForm";
import EventCategoryForm from "./EventCategoryForm";
import SubmitForm from "./SubmitForm";
import { FormVariablesType } from "./types";
import { CustomError } from "../../../hooks";
import { useApolloClient } from "@apollo/react-hooks";
import { ME, GetEditEventData } from "../../../graphql/queries";

type Props = {
  event: GetEditEventData["getEvent"] | undefined;
};

const FormsHandler: React.FC<Props> = (props) => {
  let initialVariables: FormVariablesType = {
    title: "",
    description: "",
    dateOfEvent: new Date(),
    recurringMode: false,
    dateLastRegister: new Date(),
    images: [],
    privateStatus: true,
    groupSize: 4,
    category: [],
    locationOn: false,
    address: "",
    postalCode: "",
  };
  const event = props.event;

  if (event) {
    const {
      title,
      description,
      dateOfEvent,
      dateLastRegister,
      images,
      groupSize,
      category,
      location,
    } = event;
    initialVariables = {
      ...initialVariables,
      title,
      description,
      dateOfEvent: new Date(dateOfEvent),
      dateLastRegister: new Date(dateLastRegister),
      images,
      groupSize,
      category,
      address: location.address,
      postalCode: location.postalCode,
      privateStatus: event.private,
    };
  }

  const [page, setPage] = useState<number>(0);
  const [variables, setVariables] = useState<FormVariablesType>(
    initialVariables
  );

  const client = useApolloClient();
  const userQuery = client.readQuery({ query: ME });
  const role = userQuery.me.role;

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

  const modifyVariable = (key: string) => (value: any): void => {
    const newVariables = { ...variables, [key]: value };
    setVariables(newVariables);
  };

  const validateFieldLength = (key: string) => (
    setCustomError: (error: CustomError) => void
  ) => (): boolean => {
    if ((variables[key as keyof typeof variables] as string).length === 0) {
      setCustomError(new CustomError(`${key} must not be empty`, [key]));
      return false;
    } else {
      setCustomError(new CustomError("", []));
      return true;
    }
  };

  return (
    <>
      <Layout style={styles.container}>
        <Layout style={styles.divider}>
          {page === 0 && (
            <EventDetailsForm
              variables={variables}
              modifyVariable={modifyVariable}
              nextPage={nextPage}
              validateFieldLength={validateFieldLength}
            />
          )}
          {page === 1 && (
            <EventDateForm
              variables={variables}
              modifyVariable={modifyVariable}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          )}
          {page === 2 && (
            <EventLocationForm
              variables={variables}
              modifyVariable={modifyVariable}
              nextPage={nextPage}
              prevPage={prevPage}
              validateFieldLength={validateFieldLength}
            />
          )}
          {page === 3 && (
            <EventImagesForm
              variables={variables}
              modifyVariable={modifyVariable}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          )}

          {page === 4 && (
            <EventCategoryForm
              variables={variables}
              modifyVariable={modifyVariable}
              nextPage={nextPage}
              prevPage={prevPage}
              validateFieldLength={validateFieldLength}
            />
          )}
          {page === 5 && (
            <SubmitForm
              variables={variables}
              modifyVariable={modifyVariable}
              prevPage={prevPage}
              role={role}
              id={props.event?.id}
            />
          )}
        </Layout>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,

    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  divider: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default FormsHandler;
