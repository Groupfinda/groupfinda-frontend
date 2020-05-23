import React from "react";
import { render, fireEvent, act, cleanup } from "../../../../utils/test-utils";
import SignUpForm from "../SignUpForm";
import { MockedResponse, wait } from "@apollo/react-testing";
import { CREATE_USER, REFETCH_QUERY } from "../../../graphql/mutations";
import { ME } from "../../../graphql/queries";
import { GraphQLError } from "graphql";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

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
      query: CREATE_USER,
      variables: {
        username: "test1",
        password: "test1",
        confirmPassword: "test1",
        firstName: "test1",
        lastName: "test1",
        email: "test1",
        gender: "Male",
        birthday: new Date("2000-01-01"),
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
            exception: {
              invalidArgs: [
                "username",
                "password",
                "confirmPassword",
                "firstName",
                "lastName",
                "email",
              ],
            },
          }
        ),
      ],
    },
  },
  {
    request: {
      query: CREATE_USER,
      variables: {
        username: "test2",
        password: "test2",
        confirmPassword: "test2",
        firstName: "test2",
        lastName: "test2",
        email: "test2",
        gender: "Male",
        birthday: new Date("2000-01-01"),
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
            exception: {
              invalidArgs: [
                "username",
                "password",
                "confirmPassword",
                "firstName",
                "lastName",
                "email",
              ],
            },
          }
        ),
      ],
    },
  },
  {
    request: {
      query: CREATE_USER,
      variables: {
        username: "test3",
        password: "test3",
        confirmPassword: "test3",
        firstName: "test3",
        lastName: "test3",
        email: "test3",
        gender: "Male",
        birthday: new Date("2000-01-01"),
      },
    },
    result: {
      data: {
        createUser: {
          token: "mock-token",
        },
      },
    },
  },
];
mocks.push(...dummy);
mocks.push(...dummy);
mocks.push(...dummy);

test("renders UI correctly", () => {
  const tree = render(<SignUpForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders text components correctly", () => {
  const component = render(<SignUpForm />);
  expect(component.queryByText("Username")).toBeTruthy();
  expect(component.queryByText("Password")).toBeTruthy();
  expect(component.queryByText("Confirm password")).toBeTruthy();
  expect(component.queryByText("First name")).toBeTruthy();
  expect(component.queryByText("Last name")).toBeTruthy();
  expect(component.queryByText("Email")).toBeTruthy();
  expect(component.queryByText("Gender")).toBeTruthy();
  expect(component.queryByText("Birthday")).toBeTruthy();
  expect(component.queryByText("Sign Up")).toBeTruthy();
});

test("input components work correctly", () => {
  const component = render(<SignUpForm />);
  const input1 = component.getByPlaceholder("Username");
  const input2 = component.getByPlaceholder("Password");
  const input3 = component.getByPlaceholder("First name");
  const input4 = component.getByPlaceholder("Last name");
  const input5 = component.getByPlaceholder("Confirm password");
  const input6 = component.getByPlaceholder("Email");

  expect(input1).toHaveProp("value", "");
  fireEvent.changeText(input1, "1");
  expect(input1).toHaveProp("value", "1");

  expect(input2).toHaveProp("value", "");
  fireEvent.changeText(input2, "2");
  expect(input2).toHaveProp("value", "2");

  expect(input3).toHaveProp("value", "");
  fireEvent.changeText(input3, "3");
  expect(input3).toHaveProp("value", "3");

  expect(input4).toHaveProp("value", "");
  fireEvent.changeText(input4, "4");
  expect(input4).toHaveProp("value", "4");

  expect(input5).toHaveProp("value", "");
  fireEvent.changeText(input5, "5");
  expect(input5).toHaveProp("value", "5");

  expect(input6).toHaveProp("value", "");
  fireEvent.changeText(input6, "6");
  expect(input6).toHaveProp("value", "6");
});

test("renders loading component correctly", async () => {
  const component = render(<SignUpForm />, {}, mocks);
  const button = component.getByText("Sign Up");

  await act(async () => {
    fireEvent.press(button);
    expect(component.toJSON()).toMatchSnapshot();
    await wait(0);
  });
});

test("renders error correctly", async () => {
  const component = render(<SignUpForm />, {}, mocks);
  const button = component.getByText("Sign Up");

  expect(component.queryByText("Error 1")).not.toBeTruthy();
  const input1 = component.getByPlaceholder("Username");
  const input2 = component.getByPlaceholder("Password");
  const input3 = component.getByPlaceholder("First name");
  const input4 = component.getByPlaceholder("Last name");
  const input5 = component.getByPlaceholder("Confirm password");
  const input6 = component.getByPlaceholder("Email");

  fireEvent.changeText(input1, "test1");
  fireEvent.changeText(input2, "test1");
  fireEvent.changeText(input3, "test1");
  fireEvent.changeText(input4, "test1");
  fireEvent.changeText(input5, "test1");
  fireEvent.changeText(input6, "test1");

  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(component.queryByText("Error 1")).toBeTruthy();
  expect(input1).toHaveProp("status", "danger");
  expect(input2).toHaveProp("status", "danger");
  expect(input3).toHaveProp("status", "danger");
  expect(input4).toHaveProp("status", "danger");
  expect(input5).toHaveProp("status", "danger");
  expect(input6).toHaveProp("status", "danger");

  fireEvent.changeText(input1, "");
  fireEvent.changeText(input2, "");
  fireEvent.changeText(input3, "");
  fireEvent.changeText(input4, "");
  fireEvent.changeText(input5, "");
  fireEvent.changeText(input6, "");

  expect(input1).toHaveProp("status", "basic");
  expect(input2).toHaveProp("status", "basic");
  expect(input3).toHaveProp("status", "basic");
  expect(input4).toHaveProp("status", "basic");
  expect(input5).toHaveProp("status", "basic");
  expect(input6).toHaveProp("status", "basic");
  expect(component.queryByText("Error 1")).toBeTruthy();
});

test("on success, clears error message", async () => {
  const component = render(<SignUpForm />, {}, mocks);
  const button = component.getByText("Sign Up");

  expect(component.queryByText("Error 2")).not.toBeTruthy();
  const input1 = component.getByPlaceholder("Username");
  const input2 = component.getByPlaceholder("Password");
  const input3 = component.getByPlaceholder("First name");
  const input4 = component.getByPlaceholder("Last name");
  const input5 = component.getByPlaceholder("Confirm password");
  const input6 = component.getByPlaceholder("Email");

  fireEvent.changeText(input1, "test2");
  fireEvent.changeText(input2, "test2");
  fireEvent.changeText(input3, "test2");
  fireEvent.changeText(input4, "test2");
  fireEvent.changeText(input5, "test2");
  fireEvent.changeText(input6, "test2");

  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });
  expect(component.queryByText("Error 2")).toBeTruthy();

  fireEvent.changeText(input1, "test3");
  fireEvent.changeText(input2, "test3");
  fireEvent.changeText(input3, "test3");
  fireEvent.changeText(input4, "test3");
  fireEvent.changeText(input5, "test3");
  fireEvent.changeText(input6, "test3");

  expect(component.queryByText("Error 2")).toBeTruthy();

  await act(async () => {
    fireEvent.press(button);
    await wait(0);
  });

  expect(component.queryByText("Error 2")).not.toBeTruthy();
});
