import React, { useState } from "react";
import { ApolloError } from "apollo-client";
import { Text } from "@ui-kitten/components";

type InputErrorType = {
  [key: string]: boolean;
};

interface ErrorHook {
  Error: () => JSX.Element;
  setError: (error: string) => void;
  setGraphQLError: (error: ApolloError) => void;
  inputError: InputErrorType;
  resetInputError: (key: string) => void;
  clearError: () => void;
}

export const useError = (): ErrorHook => {
  const [message, setMessage] = useState<string>("");
  const [inputError, setInputError] = useState<InputErrorType>({});

  const setError = (error: string): void => {
    setMessage(error);
  };

  const setGraphQLError = (error: ApolloError): void => {
    const { graphQLErrors, networkError } = error;
    if (graphQLErrors[0]) {
      setMessage(graphQLErrors[0].message);
      const invalidArgs =
        error.graphQLErrors[0].extensions?.exception.invalidArgs;
      let newInputError: InputErrorType = {};
      invalidArgs.forEach((key: string) => (newInputError[key] = true));
      setInputError(newInputError);
    }
    if (networkError) {
      setMessage(networkError.message);
    }
  };

  const resetInputError = (key: string): void => {
    setInputError((prev) => ({ ...prev, [key]: false }));
  };

  const Error = (): JSX.Element => {
    if (message) {
      return <Text status="danger">{message}</Text>;
    }
    return <></>;
  };

  const clearError = () => {
    setMessage("");
    setInputError({});
  };

  return {
    Error,
    setError,
    setGraphQLError,
    inputError,
    resetInputError,
    clearError,
  };
};
