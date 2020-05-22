import React from "react";
import { render } from "../../../../utils/test-utils";
import ForgetPasswordForm from "../ForgetPasswordForm";
import { MockedResponse } from "@apollo/react-testing";
import { FORGET_PASSWORD } from "../../../graphql/mutations";
import { GraphQLError } from "graphql";

const mocks: MockedResponse[] = [
  {
    request: {
      query: FORGET_PASSWORD,
      variables: {
        username: "test1",
        email: "test1",
      },
    },
    result: {
      errors: [
        new GraphQLError(
          "Error 1",
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          {
            exception: { invalidArgs: ["username", "email"] },
          }
        ),
      ],
    },
  },
  {
    request: {
      query: FORGET_PASSWORD,
      variables: {
        username: "test2",
        email: "test2",
      },
    },
    result: {
      errors: [
        new GraphQLError(
          "Error 2",
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          {
            exception: { invalidArgs: ["username"] },
          }
        ),
      ],
    },
  },
  {
    request: {
      query: FORGET_PASSWORD,
      variables: {
        username: "test3",
        email: "test3",
      },
    },
    result: {
      errors: [
        new GraphQLError(
          "Error 3",
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          {
            exception: { invalidArgs: [, "email"] },
          }
        ),
      ],
    },
  },
];

test("renders UI correctly", () => {
  const tree = render(<ForgetPasswordForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders text components correctly", () => {
  const component = render(<ForgetPasswordForm />);
  expect(component.queryByText("Username")).toBeTruthy();
  expect(component.queryByPlaceholder("Username")).toBeTruthy();
  expect(component.queryByText("Email")).toBeTruthy();
  expect(component.queryByPlaceholder("Email")).toBeTruthy();
  expect(component.queryByText("Reset my password")).toBeTruthy();
  console.log(component.queryByProps({ children: "Reset my password" }));
});
