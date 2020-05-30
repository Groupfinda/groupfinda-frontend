import React from "react";
import { render, cleanup } from "../../../utils/test-utils";
import { GraphQLError } from "graphql";
import { useError } from "../index";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";
import { ApolloError } from "apollo-boost";

afterAll(cleanup);

type Props = {
  error?: string;
  graphQLError?: ApolloError;
};
const DummyComponent: React.FC<Props> = (props) => {
  const { error, graphQLError } = props;
  const { Error, setError, setGraphQLError } = useError();
  React.useEffect(() => {
    if (error) setError(error);
    if (graphQLError) setGraphQLError(graphQLError);
  }, []);

  return (
    <View>
      <Error />
    </View>
  );
};
test("renders nothing without message", () => {
  const component = render(<DummyComponent />);
  expect(component.UNSAFE_queryByType(Text)).not.toBeTruthy();
});

test("renders with normal message", () => {
  const component = render(<DummyComponent error="error" />);
  expect(component.UNSAFE_queryByType(Text)).toBeTruthy();
  expect(component.queryByText("Error")).toBeTruthy();
});

test("renders with graphql message", () => {
  const graphQLError = new ApolloError({
    graphQLErrors: [
      new GraphQLError(
        "graphqlerror",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        {
          exception: {
            invalidArgs: [],
          },
        }
      ),
    ],
  });
  const component = render(<DummyComponent graphQLError={graphQLError} />);
  expect(component.UNSAFE_queryByType(Text)).toBeTruthy();
  expect(component.queryByText("Graphqlerror")).toBeTruthy();
});
