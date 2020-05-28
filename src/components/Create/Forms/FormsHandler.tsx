import React, { useState } from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import EventDetailsForm from "./EventDetailsForm";
import EventDateForm from "./EventDateForm";
import EventImagesForm from "./EventImagesForm";
import EventCategoryForm from "./EventCategoryForm";
import SubmitForm from "./SubmitForm";
import { FormVariablesType } from "./types";

type Props = {};

const initialVariables: FormVariablesType = {
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
};
const FormsHandler: React.FC<Props> = (props) => {
  const [page, setPage] = useState<number>(0);
  const [variables, setVariables] = useState<FormVariablesType>(
    initialVariables
  );

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const modifyVariable = (key: string) => (
    value: string | Date | number | string[] | boolean
  ): void => {
    const newVariables = { ...variables, [key]: value };
    setVariables(newVariables);
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
            <EventImagesForm
              variables={variables}
              modifyVariable={modifyVariable}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          )}
          {page === 3 && (
            <EventCategoryForm
              variables={variables}
              modifyVariable={modifyVariable}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          )}
          {page === 4 && (
            <SubmitForm
              variables={variables}
              modifyVariable={modifyVariable}
              prevPage={prevPage}
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
