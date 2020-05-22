import React from "react";
import { render, fireEvent, act, cleanup } from "../../../../utils/test-utils";
import ForgetPasswordForm from "../ForgetPasswordForm";
import { MockedResponse, wait } from "@apollo/react-testing";
import { FORGET_PASSWORD } from "../../../graphql/mutations";
import { GraphQLError } from "graphql";

afterEach(cleanup);

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
  {
    request: {
      query: FORGET_PASSWORD,
      variables: {
        username: "test4",
        email: "test4",
      },
    },
    result: {
      data: {
        forgetPassword: true,
      },
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
});

test("renders text components correctly", () => {
  const component = render(<ForgetPasswordForm />);
  expect(component.queryByText("Username")).toBeTruthy();
  expect(component.queryByPlaceholder("Username")).toBeTruthy();
  expect(component.queryByText("Email")).toBeTruthy();
  expect(component.queryByPlaceholder("Email")).toBeTruthy();
  expect(component.queryByText("Reset my password")).toBeTruthy();
});

test("renders error message and highlights fields for invalid entry", async () => {
  const component = render(<ForgetPasswordForm />, {}, mocks);

  const usernameInput = component.getByPlaceholder("Username");
  fireEvent.changeText(usernameInput, "test1");
  expect(usernameInput.props.value).toBe("test1");

  const emailInput = component.getByPlaceholder("Email");
  fireEvent.changeText(emailInput, "test1");
  expect(emailInput.props.value).toBe("test1");

  const button = component.getByText("Reset my password");
  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(component.queryByText("Error 1")).toBeTruthy();
  expect(usernameInput).toHaveProp("status", "danger");
  expect(emailInput).toHaveProp("status", "danger");
  expect(usernameInput).toHaveProp("value", "test1");
  expect(emailInput).toHaveProp("value", "test1");

  fireEvent.changeText(usernameInput, "test2");
  fireEvent.changeText(emailInput, "test2");
  expect(usernameInput).toHaveProp("status", "basic");
  expect(emailInput).toHaveProp("status", "basic");

  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(component.queryByText("Error 2")).toBeTruthy();
  expect(usernameInput).toHaveProp("status", "danger");
  expect(emailInput).toHaveProp("status", "danger");
  expect(usernameInput).toHaveProp("value", "test2");
  expect(emailInput).toHaveProp("value", "test2");

  fireEvent.changeText(usernameInput, "test3");
  fireEvent.changeText(emailInput, "test3");
  expect(usernameInput).toHaveProp("status", "basic");
  expect(emailInput).toHaveProp("status", "basic");

  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(component.queryByText("Error 3")).toBeTruthy();
  expect(usernameInput).toHaveProp("status", "danger");
  expect(emailInput).toHaveProp("status", "danger");
  expect(usernameInput).toHaveProp("value", "test3");
  expect(emailInput).toHaveProp("value", "test3");
});

test("renders success message and resets input fields on successful mutation", async () => {
  const component = render(<ForgetPasswordForm />, {}, mocks);

  const usernameInput = component.getByPlaceholder("Username");
  fireEvent.changeText(usernameInput, "test4");
  expect(usernameInput.props.value).toBe("test4");

  const emailInput = component.getByPlaceholder("Email");
  fireEvent.changeText(emailInput, "test4");
  expect(emailInput.props.value).toBe("test4");

  const button = component.getByText("Reset my password");
  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(
    component.queryByText(
      "An email has been sent containing your reset password to log in with."
    )
  ).toBeTruthy();
  expect(usernameInput).toHaveProp("value", "");
  expect(emailInput).toHaveProp("value", "");
});

test("renders error message and removes them on success", async () => {
  const component = render(<ForgetPasswordForm />, {}, mocks);

  const usernameInput = component.getByPlaceholder("Username");
  fireEvent.changeText(usernameInput, "test1");

  const emailInput = component.getByPlaceholder("Email");
  fireEvent.changeText(emailInput, "test1");

  const button = component.getByText("Reset my password");
  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(component.queryByText("Error 1")).toBeTruthy();

  fireEvent.changeText(usernameInput, "test4");
  fireEvent.changeText(emailInput, "test4");

  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(component.queryByText("Error 1")).not.toBeTruthy();
});
