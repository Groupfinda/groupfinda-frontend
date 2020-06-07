import React from "react";
import {
  render,
  fireEvent,
  act,
  cleanup,
  RenderAPI,
} from "../../../../utils/test-utils";
import FormsHandler from "../Forms/FormsHandler";
import { wait } from "@apollo/react-testing";

jest.mock("@apollo/react-hooks", () => ({
  useApolloClient: () => ({
    readQuery: (_: any) => ({ me: { role: "USER" } }),
  }),
}));
test("renders event details UI correctly", () => {
  const tree = render(<FormsHandler />).toJSON();

  expect(tree).toMatchSnapshot();
});

const skipEventDetails = (component: RenderAPI) => {
  const titleInput = component.getByPlaceholder("Event title");
  const descriptionInput = component.getByPlaceholder(
    "Enter a description for your event"
  );
  fireEvent.changeText(titleInput, "something");
  fireEvent.changeText(descriptionInput, "something");

  pressNext(component);
};

const skipEventDate = (component: RenderAPI) => {
  pressNext(component);
};

const pressNext = (component: RenderAPI) => {
  const button = component.getByText("Next");
  fireEvent.press(button);
};

const pressPrev = (component: RenderAPI) => {
  const button = component.getByText("Prev");
  fireEvent.press(button);
};

test("event details renders text correctly", () => {
  const component = render(<FormsHandler />);
  expect(component.queryByText("Tell us more about your event.")).toBeTruthy();
  expect(component.queryByText("Title")).toBeTruthy();
  expect(
    component.queryByText("Write something to attract new participants")
  ).toBeTruthy();
  expect(component.queryByText("Description")).toBeTruthy();
  expect(
    component.queryByText("Let people know what your event is about")
  ).toBeTruthy();
  expect(component.queryByText("Next")).toBeTruthy();
});

test("event details renders title error correctly", () => {
  const component = render(<FormsHandler />);
  const titleInput = component.getByPlaceholder("Event title");
  const button = component.getByText("Next");
  fireEvent.press(button);
  expect(titleInput).toHaveProp("status", "danger");
  expect(component.queryByText("Title must not be empty")).toBeTruthy();

  fireEvent.changeText(titleInput, "something");
  expect(titleInput).toHaveProp("status", "basic");
  fireEvent.press(button);
  expect(component.queryByText("Title must not be empty")).not.toBeTruthy();
});

test("event details render description error correctly", () => {
  const component = render(<FormsHandler />);
  const titleInput = component.getByPlaceholder("Event title");
  const descriptionInput = component.getByPlaceholder(
    "Enter a description for your event"
  );
  const button = component.getByText("Next");

  fireEvent.changeText(titleInput, "something");
  fireEvent.press(button);
  expect(descriptionInput).toHaveProp("status", "danger");
  expect(component.queryByText("Description must not be empty")).toBeTruthy();
  fireEvent.changeText(descriptionInput, "something");
  expect(descriptionInput).toHaveProp("status", "basic");
});

test("cannot move on from event details if either title or description is empty", () => {
  const component = render(<FormsHandler />);
  const titleInput = component.getByPlaceholder("Event title");
  const descriptionInput = component.getByPlaceholder(
    "Enter a description for your event"
  );
  const button = component.getByText("Next");

  expect(component.queryByText("Tell us more about your event.")).toBeTruthy();

  fireEvent.press(button);
  expect(component.queryByText("Tell us more about your event.")).toBeTruthy();

  fireEvent.changeText(titleInput, "something");
  fireEvent.press(button);
  expect(component.queryByText("Tell us more about your event.")).toBeTruthy();

  fireEvent.changeText(titleInput, "");
  fireEvent.changeText(descriptionInput, "something");
  fireEvent.press(button);
  expect(component.queryByText("Tell us more about your event.")).toBeTruthy();
});

/** Cannot use this as date changes every day
test("renders event date ui correctly", () => {
  const component = render(<FormsHandler />);
  skipEventDetails(component);
  expect(component.toJSON()).toMatchSnapshot();
});
*/

test("event date renders text correctly", () => {
  const component = render(<FormsHandler />);
  skipEventDetails(component);

  expect(
    component.queryByText("When is this event taking place?")
  ).toBeTruthy();
  expect(component.queryByText("Date of Event")).toBeTruthy();
  expect(
    component.queryByText("This is the actual day of your event")
  ).toBeTruthy();
  expect(
    component.queryByText(
      "When is the last day for participants to be grouped up?"
    )
  ).toBeTruthy();
  expect(component.queryByText("Date of last register")).toBeTruthy();
  expect(
    component.queryByText("This is the last day for people to sign up")
  ).toBeTruthy();
  const dateString = new Date().toLocaleDateString();
  console.log(dateString);
  expect(component.queryByText(dateString)).toBeTruthy();
  expect(component.queryByText("Prev")).toBeTruthy();
  expect(component.queryByText("Next")).toBeTruthy();
});

test("renders event location ui correctly", () => {
  const component = render(<FormsHandler />);
  skipEventDetails(component);
  skipEventDate(component);
  expect(component.toJSON()).toMatchSnapshot();
});

test("event location renders text correctly", () => {
  const component = render(<FormsHandler />);
  skipEventDetails(component);
  skipEventDate(component);
  expect(
    component.queryByText("Where is this event taking place?")
  ).toBeTruthy();
  expect(component.queryByText("Address")).toBeTruthy();
  expect(
    component.queryByText("Let users know where your event is taking place")
  ).toBeTruthy();
  expect(component.queryByText("Postal Code")).toBeTruthy();

  expect(component.queryByText("Prev")).toBeTruthy();
  expect(component.queryByText("Next")).toBeTruthy();
});
