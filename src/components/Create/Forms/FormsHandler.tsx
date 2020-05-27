import React, { useState } from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import EventDetailsForm from "./EventDetailsForm";
import EventDateForm from "./EventDateForm";
import { FormVariablesType } from "./types";

type Props = {};

const initialVariables: FormVariablesType = {
  title: "",
  description: "",
  dateOfEvent: new Date(),
  recurringMode: false,
  dateLastRegister: new Date(),
  images: [],
  private: true,
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
    value: string | Date | number
  ): void => {
    const newVariables = { ...variables, [key]: value };
    setVariables(newVariables);
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.divider}>
        {page === 0 && (
          <EventDetailsForm
            variables={variables}
            modifyVariable={modifyVariable}
          />
        )}
        {page === 1 && (
          <EventDateForm
            variables={variables}
            modifyVariable={modifyVariable}
          />
        )}
      </Layout>

      <Layout style={styles.pageNavigation}>
        <Button
          appearance="outline"
          style={{
            ...styles.prevButton,
            display: page === 0 ? "none" : "flex",
          }}
          onPress={prevPage}
        >
          Prev Page
        </Button>
        <Button onPress={() => console.log(variables)}>Console Log</Button>
        <Button
          appearance="outline"
          style={styles.nextButton}
          onPress={nextPage}
        >
          Next Page
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderColor: "green",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",

    borderWidth: 5,
  },
  divider: {
    borderColor: "blue",
    borderWidth: 5,
    flexGrow: 1,
    justifyContent: "center",
  },
  prevButton: {
    alignSelf: "flex-start",
  },
  nextButton: {
    alignSelf: "flex-end",
  },
  pageNavigation: {
    borderColor: "blue",
    borderWidth: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default FormsHandler;
