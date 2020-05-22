import React from "react";
import { render, fireEvent, act, cleanup } from "../../../../utils/test-utils";
import LogInForm from "../LogInForm";
import { MockedResponse, wait } from "@apollo/react-testing";
import { LOGIN_USER, REFETCH_QUERY } from "../../../graphql/mutations";
import { ME } from "../../../graphql/queries";
import { GraphQLError } from "graphql";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

afterEach(cleanup);

const dummy: MockedResponse[] = [
  {
    request: {
      query: REFETCH_QUERY,
    },
    result: {
      data: {
        refetchQuery: true,
      },
    },
  },
  {
    request: {
      query: ME,
    },
    result: {
      data: {
        me: null,
      },
    },
  },
];
const mocks: MockedResponse[] = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        username: "test1",
        password: "test1",
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
            exception: { invalidArgs: ["username", "password"] },
          }
        ),
      ],
    },
  },
  {
    request: {
      query: LOGIN_USER,
      variables: {
        username: "test2",
        password: "test2",
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
      query: LOGIN_USER,
      variables: {
        username: "test3",
        password: "test3",
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
            exception: { invalidArgs: [, "password"] },
          }
        ),
      ],
    },
  },
  {
    request: {
      query: LOGIN_USER,
      variables: {
        username: "test4",
        password: "test4",
      },
    },
    result: {
      data: {
        loginUser: {
          token: "mock-token",
        },
      },
    },
  },
];
mocks.push(...dummy);
mocks.push(...dummy);
mocks.push(...dummy);
mocks.push(...dummy);
mocks.push(...dummy);
test("renders UI correctly", () => {
  const tree = render(<LogInForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders text components correctly", () => {
  const component = render(<LogInForm />);
  expect(component.queryByText("Username")).toBeTruthy();
  expect(component.queryByPlaceholder("Enter username")).toBeTruthy();
  expect(component.queryByText("Password")).toBeTruthy();
  expect(component.queryByPlaceholder("Enter password")).toBeTruthy();
  expect(component.queryByText("Log in")).toBeTruthy();
});

test("renders loading component correctly", async () => {
  const component = render(<LogInForm />, {}, mocks);
  const button = component.getByText("Log in");

  await act(async () => {
    fireEvent.press(button);
    expect(component.toJSON()).toMatchSnapshot();
    await wait(0);
  });
});

test("renders error message and highlights fields for invalid entry", async () => {
  const component = render(<LogInForm />, {}, mocks);

  const usernameInput = component.getByPlaceholder("Enter username");
  fireEvent.changeText(usernameInput, "test1");
  expect(usernameInput.props.value).toBe("test1");

  const passwordInput = component.getByPlaceholder("Enter password");
  fireEvent.changeText(passwordInput, "test1");
  expect(passwordInput.props.value).toBe("test1");

  const button = component.getByText("Log in");
  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(component.queryByText("Error 1")).toBeTruthy();
  expect(usernameInput).toHaveProp("status", "danger");
  expect(passwordInput).toHaveProp("status", "danger");
  expect(usernameInput).toHaveProp("value", "test1");
  expect(passwordInput).toHaveProp("value", "test1");

  fireEvent.changeText(usernameInput, "test2");
  fireEvent.changeText(passwordInput, "test2");
  expect(usernameInput).toHaveProp("status", "basic");
  expect(passwordInput).toHaveProp("status", "basic");

  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(component.queryByText("Error 2")).toBeTruthy();
  expect(usernameInput).toHaveProp("status", "danger");
  expect(passwordInput).toHaveProp("status", "danger");
  expect(usernameInput).toHaveProp("value", "test2");
  expect(passwordInput).toHaveProp("value", "test2");

  fireEvent.changeText(usernameInput, "test3");
  fireEvent.changeText(passwordInput, "test3");
  expect(usernameInput).toHaveProp("status", "basic");
  expect(passwordInput).toHaveProp("status", "basic");

  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(component.queryByText("Error 3")).toBeTruthy();
  expect(usernameInput).toHaveProp("status", "danger");
  expect(passwordInput).toHaveProp("status", "danger");
  expect(usernameInput).toHaveProp("value", "test3");
  expect(passwordInput).toHaveProp("value", "test3");
});

test("resets input fields on successful mutation", async () => {
  const component = render(<LogInForm />, {}, mocks);

  const usernameInput = component.getByPlaceholder("Enter username");
  fireEvent.changeText(usernameInput, "test4");
  expect(usernameInput.props.value).toBe("test4");

  const passwordInput = component.getByPlaceholder("Enter username");
  fireEvent.changeText(passwordInput, "test4");
  expect(passwordInput.props.value).toBe("test4");

  const button = component.getByText("Log in");
  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(usernameInput).toHaveProp("value", "");
  expect(passwordInput).toHaveProp("value", "");
});

test("renders error message and removes them on success", async () => {
  const component = render(<LogInForm />, {}, mocks);

  const usernameInput = component.getByPlaceholder("Enter username");
  fireEvent.changeText(usernameInput, "test1");

  const passwordInput = component.getByPlaceholder("Enter password");
  fireEvent.changeText(passwordInput, "test1");

  const button = component.getByText("Log in");
  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(component.queryByText("Error 1")).toBeTruthy();

  fireEvent.changeText(usernameInput, "test4");
  fireEvent.changeText(passwordInput, "test4");

  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(component.queryByText("Error 1")).not.toBeTruthy();
});
